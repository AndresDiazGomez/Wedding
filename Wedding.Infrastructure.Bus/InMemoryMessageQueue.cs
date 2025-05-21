using System.Threading.Channels;

namespace Wedding.Infrastructure.Bus;

public sealed class InMemoryMessageQueue<T>  where T : IIntegrationEvent
{
    private readonly Channel<T> _channel = Channel.CreateUnbounded<T>();

    public ChannelReader<T> Reader => _channel.Reader;

    public ChannelWriter<T> Writer => _channel.Writer;
}