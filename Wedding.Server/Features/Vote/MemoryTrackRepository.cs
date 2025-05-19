namespace Wedding.Server.Features.Vote;

public class MemoryTrackRepository : ITrackRepository
{
    private readonly Dictionary<long, TrackVotes> _store;

    public MemoryTrackRepository()
    {
        _store = [];
    }

    public Task<TrackVotes[]> GetTrackVotesAsync()
    {
        var result = _store.Values.ToArray();
        return Task.FromResult(result);
    }

    public Task UpsertTrackAsync(TrackVote TrackVote)
    {
        foreach (Track track in TrackVote.Tracks)
        {
            if (_store.TryGetValue(track.TrackId, out TrackVotes? trackVotes))
            {
                trackVotes.Voters.Add(TrackVote.VoterId);
            }
            else
            {
                trackVotes = new TrackVotes
                {
                    TrackId = track.TrackId,
                    ArtworkUrl100 = track.ArtworkUrl100,
                    TrackName = track.TrackName,
                    ArtistName = track.ArtistName,
                    PreviewUrl = track.PreviewUrl,
                    Voters = [TrackVote.VoterId]
                };
                _store[track.TrackId] = trackVotes;
            }
        }
        return Task.CompletedTask;
    }
}
