namespace Wedding.Infrastructure.Bus;

public interface IIntegrationEvent
{
    Guid Id { get; init; }
}
