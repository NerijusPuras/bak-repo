namespace Data.Models;

public class Lecture
{
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime Modified { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Guid? TopicId { get; set; }
    public ICollection<Contribution> Contributions { get; set; } = new List<Contribution>();
    public ICollection<Slide> Slides { get; set; } = new List<Slide>();
}
