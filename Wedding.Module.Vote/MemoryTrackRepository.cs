using System.Collections.Concurrent;

namespace Wedding.Module.Vote;

public class MemoryTrackRepository
{
    private readonly ConcurrentDictionary<long, TrackVotes> _store;
    private readonly HashSet<long> _dirty = [];

    public MemoryTrackRepository()
    {
        _store = new ConcurrentDictionary<long, TrackVotes>
        {
            [1594677764] = new TrackVotes
            {
                TrackId = 1594677764,
                ArtworkUrl100 = "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/94/4d/9a/944d9a8d-0549-f537-5706-5b083bd84a7d/21UM1IM38949.rgb.jpg/100x100bb.jpg",
                TrackName = "All Of You",
                ArtistName = "Stephanie Beatriz, Olga Merediz, John Leguizamo, Adassa, Maluma & Encanto - Cast",
                PreviewUrl = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/15/30/7c/15307c6a-81cd-824b-fd72-1dacd4790260/mzaf_1002346285523223508.plus.aac.p.m4a",
                Voters = ["::1", "::2"]
            }
        };
    }

    internal Task<TrackVotes[]> GetTrackVotesAsync()
    {
        var result = _store.Values.ToArray();
        return Task.FromResult(result);
    }

    internal bool UpsertTrack(VoteForTrackCommand TrackVote)
    {
        bool added = false;
        foreach (Track track in TrackVote.Tracks)
        {
            _store.AddOrUpdate(
                track.TrackId,
                key => 
                {
                    added = true;
                    return new TrackVotes
                    {
                        TrackId = track.TrackId,
                        ArtworkUrl100 = track.ArtworkUrl100,
                        TrackName = track.TrackName,
                        ArtistName = track.ArtistName,
                        PreviewUrl = track.PreviewUrl,
                        Voters = [TrackVote.VoterId]
                    };
                },
                (key, existing) =>
                {
                    if (existing.Voters.Add(TrackVote.VoterId))
                    {
                        added = true;
                    }
                    return existing;
                }
            );
            _dirty.Add(track.TrackId);
        }

        return added;
    }

    internal Task<bool> RemoveTrackAsync(long trackId)
    {
        bool removed = _store.TryRemove(trackId, out _);
        return Task.FromResult(removed);
    }

    internal TrackVotes[] GetDirty()
    {
        return [.. _store
            .Where(item => _dirty.Contains(item.Key))
            .Select(item => item.Value)];
    }

    internal void Clear()
    {
        _dirty.Clear();
    }
}