using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace SFKR.DataAccess;

public class LectureRepository : ILectureRepository
{
    private readonly BakbeContext _context;

    public LectureRepository(BakbeContext context)
    {
        _context = context;
    }

    private LectureDto MapModelToDto(Lecture lecture)
    {
        return new LectureDto
        {
            Id = lecture.Id,
            Modified = lecture.Modified,
            Title = lecture.Title,
            Description = lecture.Description,
            ChildrenCount = lecture.Slides.Count
        };
    }

    public async Task<Guid> CreateLecture(Lecture lecture)
    {
        await _context.Lectures.AddAsync(lecture);
        await _context.SaveChangesAsync();

        return lecture.Id;
    }

    public async Task<List<LectureDto>> GetLectureDtos()
    {
        var lectures = await _context.Lectures.Include(t => t.Slides).ToListAsync();

        return lectures.Select(x => MapModelToDto(x)).ToList();
    }

    public async Task<List<Lecture>> GetLectures()
    {
        return await _context.Lectures.Include(t => t.Slides).ToListAsync();
    }

    public async Task<List<LectureDto>?> GetLectureDtosByTopicId(Guid topicId)
    {
        var lectures = await _context.Lectures.Include(t => t.Slides).Where(lect => lect.TopicId == topicId).ToListAsync();

        return lectures.Select(x => MapModelToDto(x)).ToList();
    }

    public async Task<Lecture?> GetLectureById(Guid lectureId)
    {
        return await _context.Lectures.FirstOrDefaultAsync(x => x.Id == lectureId);
    }

    public async Task<int> GetContributionsCountForLecture(Guid lectureId)
    {
        return await _context.Contributions.Where(x => x.LectureId == lectureId).CountAsync();
    }
}
