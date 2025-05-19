using Microsoft.AspNetCore.SignalR;

namespace Wedding.Server.Features.Vote;

internal sealed class VotesFeedHub : Hub<IVotesFeedUpdateClient>
{
}