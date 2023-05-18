namespace Data.Models;

public class Topic
{
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime Modified { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ICollection<Lecture> Lectures { get; set; } = new List<Lecture>();
}
