using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace SFKR.DataAccess;

public class ContributionRepository : IContributionRepository
{ 
    private readonly BakbeContext _context;

    public ContributionRepository(BakbeContext context)
    {
        _context = context;
    }

    public async Task CreateDefaultContribution(Guid lectureId)
    {
        await _context.Contributions.AddAsync(new Contribution { LectureId = lectureId, Text = "Default contribution"});
        await _context.SaveChangesAsync();
    }

    public async Task<ContributionDto?> GetRandomContributionByLectureId(Guid lectureId)
    {
        var contribution = await _context.Contributions.Where(
                c => c.LectureId == lectureId 
                    && c.Status == ContributionStatus.InValidation 
                    && !_context.ContributionValidation.Any(cv => cv.ContributionId == c.Id 
                            && cv.ValidatedUserName == "Vardenis Pavardenis")
            ).FirstOrDefaultAsync();

        return contribution == null ? null : MapModelToDto(contribution);
    }

    private ContributionDto MapModelToDto(Contribution contribution) => new()
    {
        Id = contribution.Id,
        Text = contribution.Text,
    };
}
