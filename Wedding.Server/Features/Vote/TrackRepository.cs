namespace Wedding.Server.Features.Vote;

//public class TrackRepository : ITrackRepository
//{
//    private readonly Container _container;

//    public TrackRepository(CosmosClient cosmosClient, string databaseId, string containerId)
//    {
//        _container = cosmosClient.GetContainer(databaseId, containerId);
//    }

//    public Task<TrackVotes[]> GetTrackVotesAsync()
//    {
//        //try
//        //{
//        //    ItemResponse<TrackVotes> response = await _container.ReadItemAsync<TrackVotes>(
//        //        trackId.ToString(),
//        //        new PartitionKey(trackId.ToString())
//        //    );
//        //    return response.Resource;
//        //}
//        //catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
//        //{
//        //    return null;
//        //}
//        return Task.FromResult(Array.Empty<TrackVotes>());
//    }

//    public Task UpsertTrackAsync(TrackVote trackVote)
//    {
//        //await _container.UpsertItemAsync(
//        //    track,
//        //    new PartitionKey(track.TrackId.ToString())
//        //);
//        return Task.CompletedTask;
//    }
//}
