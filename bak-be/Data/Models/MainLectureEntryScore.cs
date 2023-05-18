namespace Data.Models;

public class MainLectureEntryScore
{
    public Guid Id { get; set; }
    public string? PlayerName { get; set; }
    public int CorrectAnswers { get; set; }
    public int TotalQuestions { get; set; }
    public int TotalScore { get; set; }
    public bool HasKnowledgeSharingBadge { get; set; }
    public bool HasExpertBadge { get; set; }
    public int KnowledgeSharingBadgeCount { get; set; }
    public int ExpertBadgeCount { get; set; }
    public Guid? LectureId { get; set; }
}
