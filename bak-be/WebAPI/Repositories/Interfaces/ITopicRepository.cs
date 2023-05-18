namespace SFKR.DataAccess;

using Data.Models;

public interface ITopicRepository
{
    Task<List<Topic>> GetTopics();
    Task<Guid> CreateTopic(Topic topic);
    Task<Topic?> GetTopicById(Guid topicId);
    Task<List<TopicDto>> GetTopicDtos();
    Task<List<LectureEntryScore>> GetLeaderboardScoreListByTopicId(Guid topicId);
}
