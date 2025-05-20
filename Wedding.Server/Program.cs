using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel.DataAnnotations;
using Wedding.Server.Features.Vote;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<ITrackRepository, MemoryTrackRepository>();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseHttpsRedirection();

app.MapGet("/api/votes", async (ITrackRepository repository) =>
{
    TrackVotes[] votes = await repository.GetTrackVotesAsync();
    return Results.Ok(votes);
});

app.MapPost("/api/votes", async (ITrackRepository repository, 
    IHttpContextAccessor httpContextAccessor,
    IHubContext<VotesFeedHub, IVotesFeedUpdateClient> hubContext,
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
    await hubContext.Clients.All.ReceiveVotesOnUpdate(trackVote);
    return Results.Ok();
});

app.MapHub<VotesFeedHub>("/hubs/vote-feed");

app.MapFallbackToFile("/index.html");

app.Run();
