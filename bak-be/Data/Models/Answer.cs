namespace Data.Models;

public class Answer
{
    public Guid Id { get; set; }
    public Guid SlideId { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    //public Slide? Slide { get; set; }
}
