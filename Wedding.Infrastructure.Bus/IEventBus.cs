namespace Wedding.Infrastructure.Bus;

public interface IEventBus<T> where T : IIntegrationEvent
{
    Task PublishAsync(T eventMessage, CancellationToken cancellationToken = default);
}
