namespace Wedding.Module.Vote;

public class TrackVotes : Track
{
    // TODO List / HashSet
    public HashSet<string> Voters { get; set; } = [];
}