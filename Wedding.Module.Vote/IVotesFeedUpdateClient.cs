namespace Wedding.Module.Vote;

public interface IVotesFeedUpdateClient
{
    Task OnTrackRemoved(long trackId);
    Task ReceiveVotesOnUpdate(TrackVote trackVotes);
}
