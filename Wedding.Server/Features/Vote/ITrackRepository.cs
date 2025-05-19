namespace Wedding.Server.Features.Vote;

public interface ITrackRepository
{
    Task<TrackVotes[]> GetTrackVotesAsync();

    Task UpsertTrackAsync(TrackVote trackVote);
}