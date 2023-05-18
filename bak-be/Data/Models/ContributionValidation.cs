namespace Data.Models;

public class ContributionValidation
{
    public Guid Id { get; set; }
    public Guid ContributionId { get; set; }
    public ContributionValidationResult ValidationResult { get; set; }
    public string? ValidatedUserName { get; set; }
}
