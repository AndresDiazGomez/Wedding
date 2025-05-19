using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Wedding.Server.Features.Vote;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<ITrackRepository, MemoryTrackRepository>();

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
    return Results.Ok();
});

app.MapFallbackToFile("/index.html");

app.Run();
