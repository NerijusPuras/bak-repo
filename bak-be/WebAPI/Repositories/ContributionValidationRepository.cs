using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace SFKR.DataAccess;

public class ContributionValidationRepository : IContributionValidationRepository
{ 
    private readonly BakbeContext _context;

    public ContributionValidationRepository(BakbeContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateContributionValidation(ContributionValidation contributionValidation)
    {
        await _context.ContributionValidation.AddAsync(contributionValidation);
        await _context.SaveChangesAsync();

        var contributionValidations = await _context.ContributionValidation.Where(x => x.ContributionId == contributionValidation.ContributionId).ToListAsync();

        var IsCorrectContributionValidationsCount = contributionValidations.Where(x => x.ValidationResult == ContributionValidationResult.Correct).Count();
        var IsIncorrectContributionValidationsCount = contributionValidations.Where(x => x.ValidationResult == ContributionValidationResult.Incorrect).Count();

        var smth = (IsCorrectContributionValidationsCount * 100) / (contributionValidations.Count * 100);
        var smth1 = (double)IsCorrectContributionValidationsCount / contributionValidations.Count;

        var smth2 = (IsIncorrectContributionValidationsCount * 100) / (contributionValidations.Count * 100);

        if (contributionValidations.Count >= 3 
                && (double)IsCorrectContributionValidationsCount / contributionValidations.Count > 0.66 
                && (double)IsIncorrectContributionValidationsCount / contributionValidations.Count < 0.34)
        {
            var contributionToModify = await _context.Contributions.Where(x => x.Id == contributionValidation.ContributionId).FirstOrDefaultAsync();
            contributionToModify.Status = ContributionStatus.Valid;
            var slideToModify = await _context.Slides.Where(s => s.Id == contributionToModify.SlideId).FirstOrDefaultAsync();
            if (slideToModify != null)
            {
                slideToModify.Text += $"\n{contributionToModify.Text}";
            }
            else
            {
                var firstSlideToModify = await _context.Slides.Where(s => s.LectureId == contributionToModify.LectureId).FirstOrDefaultAsync();
                firstSlideToModify.Text += $"\n{contributionToModify.Text}";
            }
        } else if(contributionValidations.Count >= 3 && (double)IsIncorrectContributionValidationsCount / contributionValidations.Count > 0.34)
        {
            var contributionToModify = await _context.Contributions.Where(x => x.Id == contributionValidation.ContributionId).FirstOrDefaultAsync();
            contributionToModify.Status = ContributionStatus.Invalid;
        }

        await _context.SaveChangesAsync();

        return contributionValidation.Id;
    }
}
