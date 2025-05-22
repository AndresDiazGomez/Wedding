using System.ComponentModel.DataAnnotations;

namespace Wedding.Module.Vote;

public class VoteForTrackCommand
{
    [Required]
    public string VoterId { get; set; } = string.Empty;

    public Track[] Tracks { get; set; } = [];
}