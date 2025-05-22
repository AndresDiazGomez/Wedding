using Microsoft.AspNetCore.SignalR;

namespace Wedding.Module.Vote.Hubs;

internal sealed class VotesFeedHub : Hub<IVotesFeedUpdateClient>
{
}