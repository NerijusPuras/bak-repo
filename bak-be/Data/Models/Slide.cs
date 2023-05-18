namespace Data.Models;

public class Slide
{
    public Guid Id { get; set; }
    public Guid LectureId { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Index { get; set; }
    public bool IsQuestion { get; set; }
    public ICollection<Answer> Answers { get; set; } = new List<Answer>();
}
