namespace Wedding.Server.Features.Vote;

public class TrackVotes : Track
{
    public HashSet<string> Voters { get; set; } = [];
}