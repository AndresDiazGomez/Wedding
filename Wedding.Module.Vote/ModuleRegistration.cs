using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using System.ComponentModel.DataAnnotations;
using Wedding.Infrastructure.Bus;
using Wedding.Module.Vote.Events;

namespace Wedding.Module.Vote;

public static class ModuleRegistration
{
    public static IServiceCollection AddVoteModule(this IServiceCollection services)
    {
        services.AddHttpContextAccessor()
            .AddSingleton<ITrackRepository, MemoryTrackRepository>()
            .AddSignalR();

        services.AddSingleton(typeof(IEventBus<>), typeof(ChannelEventBus<>));
        services.AddSingleton(typeof(InMemoryMessageQueue<>));

        services.AddHostedService<NewVotedIntegrationEventProcessor>();
        services.AddHostedService<TrackRemovedIntegrationEventProcessor>();

        return services;
    }

    public static void MapVotingEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/votes", async (ITrackRepository repository) =>
        {
            TrackVotes[] votes = await repository.GetTrackVotesAsync();
            return Results.Ok(votes);
        });

        app.MapPost("/api/votes", async (ITrackRepository repository,
            IHttpContextAccessor httpContextAccessor,
            IEventBus<NewVotedIntegrationEvent> eventBus,
            CancellationToken cancellationToken,
            [Required][FromBody] Track[] tracks) =>
        {
            if (tracks is null || tracks.Length == 0)
            {
                return Results.BadRequest();
            }
            TrackVote trackVote = new()
            {
                Tracks = [.. tracks.Where(item => item is not null)],
                VoterId = httpContextAccessor?.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? string.Empty
            };
            if (trackVote.Tracks.Length == 0)
            {
                return Results.BadRequest();
            }
            await repository.UpsertTrackAsync(trackVote);
            await eventBus.PublishAsync(new NewVotedIntegrationEvent(trackVote), cancellationToken);
            return Results.Ok();
        });

        app.MapDelete("/api/votes/{trackId:long}", async (long trackId,
            ITrackRepository repository,
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