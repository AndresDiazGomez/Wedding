using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Wedding.Module.Vote;

internal class FlushServiceProcessor : BackgroundService
{
    private readonly PeriodicTimer _periodicTimer = new(TimeSpan.FromSeconds(5));
    private readonly MemoryTrackRepository _memoryRepository;
    private readonly ILogger<FlushServiceProcessor> _logger;

    public FlushServiceProcessor(MemoryTrackRepository memoryRepository, ILogger<FlushServiceProcessor> logger)
    {
        _memoryRepository = memoryRepository ?? throw new ArgumentNullException(nameof(memoryRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (await _periodicTimer.WaitForNextTickAsync(stoppingToken) &&
            !stoppingToken.IsCancellationRequested)
        {
            Track[] dirtySongs = _memoryRepository.GetDirty();
            _logger.LogInformation("Serialization {serialized}", JsonSerializer.Serialize(dirtySongs));
            _memoryRepository.Clear();
        }
    }
}
