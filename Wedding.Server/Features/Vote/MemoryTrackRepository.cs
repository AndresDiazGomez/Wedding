namespace Wedding.Server.Features.Vote;

public class MemoryTrackRepository : ITrackRepository
{
    private readonly Dictionary<long, TrackVotes> _store;

    public MemoryTrackRepository()
    {
        _store = new Dictionary<long, TrackVotes>
        {
            [1594677764] = new TrackVotes
            {
                TrackId = 1594677764,
                ArtworkUrl100 = "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/94/4d/9a/944d9a8d-0549-f537-5706-5b083bd84a7d/21UM1IM38949.rgb.jpg/100x100bb.jpg",
                TrackName = "All Of You",
                ArtistName = "Stephanie Beatriz, Olga Merediz, John Leguizamo, Adassa, Maluma & Encanto - Cast",
                PreviewUrl = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/15/30/7c/15307c6a-81cd-824b-fd72-1dacd4790260/mzaf_1002346285523223508.plus.aac.p.m4a",
                Voters = new HashSet<string> { "::1", "::2" }
            }
        };

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
