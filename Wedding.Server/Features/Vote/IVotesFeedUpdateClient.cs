namespace Wedding.Server.Features.Vote;

public interface IVotesFeedUpdateClient
{
    Task ReceiveVotesOnUpdate(TrackVote trackVotes);
}
