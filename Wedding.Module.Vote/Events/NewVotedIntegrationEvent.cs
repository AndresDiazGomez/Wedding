using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Wedding.Infrastructure.Bus;

namespace Wedding.Module.Vote.Events;

internal record NewVotedIntegrationEvent(TrackVote TrackVote) : IntegrationEvent
{
}

internal class NewVotedIntegrationEventProcessor : BackgroundService
{
    private readonly InMemoryMessageQueue<NewVotedIntegrationEvent> _inMemoryMessageQueue;
    private readonly IHubContext<VotesFeedHub, IVotesFeedUpdateClient> _hubContext;

    public NewVotedIntegrationEventProcessor(InMemoryMessageQueue<NewVotedIntegrationEvent> inMemoryMessageQueue,
        IHubContext<VotesFeedHub, IVotesFeedUpdateClient> hubContext)
    {
        _inMemoryMessageQueue = inMemoryMessageQueue ?? throw new ArgumentNullException(nameof(inMemoryMessageQueue));
        _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (await _inMemoryMessageQueue.Reader.WaitToReadAsync(stoppingToken))
        {
            NewVotedIntegrationEvent message = 
                await _inMemoryMessageQueue.Reader.ReadAsync(stoppingToken);

            await _hubContext.Clients.All.ReceiveVotesOnUpdate(message.TrackVote);
        }
    }
}