using System.ComponentModel.DataAnnotations;

namespace Wedding.Server.Features.Vote;

public class Track
{
    [Required]
    public long TrackId { get; set; }

    [Required]
    public string ArtworkUrl100 { get; set; } = string.Empty;

    [Required]
    public string TrackName { get; set; } = string.Empty;

    [Required]
    public string ArtistName { get; set; } = string.Empty;

    [Required]
    public string PreviewUrl { get; set; } = string.Empty;
}
