using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Wedding.Infrastructure.Bus;

namespace Wedding.Module.Vote.Events;

internal record TrackRemovedIntegrationEvent(long TrackId) : IntegrationEvent
{
}

internal class TrackRemovedIntegrationEventProcessor : BackgroundService
{
    private readonly InMemoryMessageQueue<TrackRemovedIntegrationEvent> _inMemoryMessageQueue;
    private readonly IHubContext<VotesFeedHub, IVotesFeedUpdateClient> _hubContext;

    public TrackRemovedIntegrationEventProcessor(InMemoryMessageQueue<TrackRemovedIntegrationEvent> inMemoryMessageQueue,
        IHubContext<VotesFeedHub, IVotesFeedUpdateClient> hubContext)
    {
        _inMemoryMessageQueue = inMemoryMessageQueue ?? throw new ArgumentNullException(nameof(inMemoryMessageQueue));
        _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (await _inMemoryMessageQueue.Reader.WaitToReadAsync(stoppingToken))
        {
            TrackRemovedIntegrationEvent message =
                await _inMemoryMessageQueue.Reader.ReadAsync(stoppingToken);

            await _hubContext.Clients.All.OnTrackRemoved(message.TrackId);
        }
    }
}