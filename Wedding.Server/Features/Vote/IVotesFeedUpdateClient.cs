namespace Wedding.Server.Features.Vote;

public interface IVotesFeedUpdateClient
{
    Task OnTrackRemoved(long trackId);
    Task ReceiveVotesOnUpdate(TrackVote trackVotes);
}
