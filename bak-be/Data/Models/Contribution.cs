namespace Data.Models;

public class Contribution
{
    public Guid Id { get; set; }
    public Guid LectureId { get; set; }
    public Guid SlideId { get; set; }
    public string Text { get; set; } = string.Empty;
    public ContributionStatus Status { get; set; }
}
