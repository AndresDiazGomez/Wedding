namespace Wedding.Module.Vote.Hubs;

public interface IVotesFeedUpdateClient
{
    Task OnTrackRemoved(long trackId);
    Task ReceiveVotesOnUpdate(VoteForTrackCommand trackVotes);
}
