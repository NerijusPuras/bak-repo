namespace Data.Models;

public class TopicDto
{
    public Guid Id { get; set; }
    public DateTime Modified { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    // Lectures count
    public int ChildrenCount { get; set; }
}
