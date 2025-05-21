using Microsoft.AspNetCore.SignalR;

namespace Wedding.Module.Vote;

internal sealed class VotesFeedHub : Hub<IVotesFeedUpdateClient>
{
}