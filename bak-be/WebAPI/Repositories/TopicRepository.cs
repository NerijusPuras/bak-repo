using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace WebAPI;

public class TopicRepository : ITopicRepository
{
    private readonly BakbeContext _context;

    public TopicRepository(BakbeContext context)
    {
        _context = context;
    }

    private TopicDto MapModelToDto(Topic topic)
    {
        return new TopicDto
        {
            Id = topic.Id,
            Modified = topic.Modified,
            Title = topic.Title,
            Description = topic.Description,
            ChildrenCount = topic.Lectures.Count
        };
    }

    public async Task<Guid> CreateTopic(Topic topic)
    {
        //var item = await BuildTopicEntity(partialItem);

        await _context.Topics.AddAsync(topic);
        await _context.SaveChangesAsync();

        return topic.Id;
    }

    public async Task<Topic?> GetTopicById(Guid topicId)
    {
        return await _context.Topics.Include(t => t.Lectures).FirstOrDefaultAsync(x => x.Id == topicId);
    }

    public async Task<List<Topic>> GetTopics()
    {
        return await _context.Topics.Include(t => t.Lectures).ToListAsync();
    }

    public async Task<List<TopicDto>> GetTopicDtos()
    {
        var topics = await _context.Topics.Include(t => t.Lectures).ToListAsync();

        return topics.Select(x => MapModelToDto(x)).ToList();
    }

    public async Task<List<LectureEntryScore>> GetLeaderboardScoreListByTopicId(Guid topicId)
    {
        var lectures = await _context.Lectures.Where(x => x.TopicId == topicId).ToListAsync();
        var scores = _context.LectureEntryScores
                                        .Join(_context.Lectures,
                                            score => score.LectureId,
                                            lecture => lecture.Id,
                                            (score, lecture) => new { LectureEntryScore = score, Lecture = lecture })
                                        .Where(sl => sl.Lecture.TopicId == topicId)
                                        .GroupBy(x => x.LectureEntryScore.PlayerName)
                                        .Select(g => new LectureEntryScore()
                                        {
                                            Id = (Guid)g.First().LectureEntryScore.LectureId,
                                            PlayerName = g.Key,
                                            TotalScore = g.Sum(x => x.LectureEntryScore.TotalScore),
                                            CorrectAnswers = g.Sum(x => x.LectureEntryScore.CorrectAnswers),
                                            TotalQuestions = g.Sum(x => x.LectureEntryScore.TotalQuestions),
                                            HasKnowledgeSharingBadge = g.Any(x => x.LectureEntryScore.HasKnowledgeSharingBadge),
                                            HasExpertBadge = g.Any(x => x.LectureEntryScore.HasExpertBadge),
                                        })
                                        .OrderByDescending(x => x.TotalScore)
                                        .ToList();

        return scores;
    }
}
