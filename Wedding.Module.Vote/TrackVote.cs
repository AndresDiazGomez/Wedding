using System.ComponentModel.DataAnnotations;

namespace Wedding.Module.Vote;

public class TrackVote
{
    [Required]
    public string VoterId { get; set; } = string.Empty;

    public Track[] Tracks { get; set; } = [];
}