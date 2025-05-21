namespace Wedding.Module.Vote;

public interface ITrackRepository
{
    Task<TrackVotes[]> GetTrackVotesAsync();

    Task UpsertTrackAsync(TrackVote trackVote);

    Task<bool> RemoveTrackAsync(long trackId);
}