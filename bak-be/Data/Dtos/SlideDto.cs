namespace Data.Models;

public class SlideDto
{
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Index { get; set; }
    public bool IsQuestion { get; set; }
    public List<AnswerDto>? Answers { get; set; }
}
