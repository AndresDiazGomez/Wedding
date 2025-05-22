namespace Wedding.Module.Vote;

public interface ITrackRepository
{
    Task<TrackVotes[]> GetTrackVotesAsync();

    Task UpsertTrackAsync(VoteForTrackCommand trackVote);

    Task<bool> RemoveTrackAsync(long trackId);
}