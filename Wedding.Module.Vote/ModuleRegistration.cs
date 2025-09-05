using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System.ComponentModel.DataAnnotations;
using Wedding.Infrastructure.Bus;
using Wedding.Module.Vote.Events;
using Wedding.Module.Vote.Hubs;

namespace Wedding.Module.Vote;

public static class ModuleRegistration
{
    public static IServiceCollection AddVoteModule(this IServiceCollection services)
    {
        services.AddHttpContextAccessor()
            .AddSingleton<MemoryTrackRepository>()
            .AddSingleton<IDeviceIdProvider, DeviceIdProvider>()
            .AddSingleton(typeof(IEventBus<>), typeof(ChannelEventBus<>))
            .AddSingleton(typeof(InMemoryMessageQueue<>))
            .AddSignalR();

        services
            .AddHostedService<NewVotedIntegrationEventProcessor>()
            .AddHostedService<TrackRemovedIntegrationEventProcessor>()
            .AddHostedService<FlushServiceProcessor>();

        return services;
    }

    public static void MapVotingEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/votes", async (MemoryTrackRepository repository) =>
        {
            TrackVotes[] votes = await repository.GetTrackVotesAsync();
            return Results.Ok(votes);
        });

        app.MapPost("/api/votes", async (MemoryTrackRepository repository,
            IDeviceIdProvider deviceIdProvider,
            IEventBus<NewVotedIntegrationEvent> eventBus,
            CancellationToken cancellationToken,
            [Required][FromBody] Track[] tracks) =>
        {
            if (tracks is null || tracks.Length == 0)
            {
                return Results.BadRequest();
            }
            VoteForTrackCommand trackVote = new()
            {
                Tracks = [.. tracks.Where(item => item is not null)],
                VoterId = deviceIdProvider.GetDeviceId()
            };
            if (trackVote.Tracks.Length == 0)
            {
                return Results.BadRequest();
            }
            bool wasAdded = repository.UpsertTrack(trackVote);
            if (wasAdded)
            {
                await eventBus.PublishAsync(new NewVotedIntegrationEvent(trackVote), cancellationToken);
            }
            return Results.Ok();
        });

        app.MapDelete("/api/votes/{trackId:long}", async (long trackId,
            MemoryTrackRepository repository,
            IEventBus<TrackRemovedIntegrationEvent> eventBus,
            CancellationToken cancellationToken) =>
        {
            bool removed = await repository.RemoveTrackAsync(trackId);
            if (!removed)
            {
                return Results.NotFound();
            }
            await eventBus.PublishAsync(new TrackRemovedIntegrationEvent(trackId), cancellationToken);
            return Results.NoContent();
        });

        app.MapHub<VotesFeedHub>("/hubs/vote-feed");
    }
}