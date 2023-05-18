using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace SFKR.DataAccess;

public class SlideRepository : ISlideRepository
{
    private readonly BakbeContext _context;

    public SlideRepository(BakbeContext context)
    {
        _context = context;
    }

    private SlideDto MapModelToDto(Slide slide)
    {
        return new SlideDto
        {
            Id = slide.Id,
            Text = slide.Text,
            Index = slide.Index,
            IsQuestion = slide.IsQuestion,
            Answers = slide.Answers.Select(answer => MapModelToDto(answer)).ToList(),
        };
    }

    private AnswerDto MapModelToDto(Answer answer)
    {
        return new AnswerDto
        {
            Id = answer.Id,
            Text = answer.Text,
        };
    }

    public async Task<Guid> CreateSlide(Slide slide)
    {
        await _context.Slides.AddAsync(slide);
        await _context.SaveChangesAsync();

        return slide.Id;
    }

    public async Task<List<SlideDto>?> GetSlideDtosByLectureId(Guid lectureId)
    {
        var slides = await _context.Slides.Where(s => s.LectureId == lectureId)
            .Include(x => x.Answers).ToListAsync();

        return slides.Select(x => MapModelToDto(x)).ToList();
    }

    public async Task<SlideDto?> GetSlideDtoByLectureIdAndSlideId(Guid lectureId, Guid slideId)
    {
        var slide = await _context.Slides
            .Where(s => s.LectureId == lectureId && s.Id == slideId)
            .Include(x => x.Answers)
            .FirstOrDefaultAsync();

        if (slide == null) return null;

        return MapModelToDto(slide);
    }

    public async Task<List<Guid>?> GetSlideIdsByIndexByLectureId(Guid lectureId)
    {
        return await _context.Slides.Where(s => s.LectureId == lectureId)
            .OrderBy(x => x.Index)
            .Select(x => x.Id)
            .ToListAsync();
    }

    public async Task<Guid?> GetCorrectAnswerId(Guid slideId)
    {
        var slide = await _context.Slides.Where(s => s.Id == slideId).Include(x => x.Answers).FirstOrDefaultAsync();

        return slide?.Answers.SingleOrDefault(a => a.IsCorrect)?.Id;
    }

    public async Task<Guid> SaveContributionForSlide(Guid lectureId, Guid slideId, string contribution)
    {
        await _context.Contributions.AddAsync(new Contribution { 
            LectureId = lectureId, SlideId = slideId, Text = contribution 
        });
        await _context.SaveChangesAsync();

        return slideId;
    }
}
