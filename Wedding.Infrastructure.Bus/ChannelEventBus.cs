namespace Wedding.Infrastructure.Bus;

public sealed class ChannelEventBus<T> : IEventBus<T> where T : IIntegrationEvent
{
    private readonly InMemoryMessageQueue<T> _messageBus;

    public ChannelEventBus(InMemoryMessageQueue<T> messageBus)
    {
        _messageBus = messageBus ?? throw new ArgumentNullException(nameof(messageBus));
    }

    public async Task PublishAsync(T eventMessage, CancellationToken cancellationToken = default) 
    {
        await _messageBus.Writer.WriteAsync(eventMessage, cancellationToken);
    }
}
