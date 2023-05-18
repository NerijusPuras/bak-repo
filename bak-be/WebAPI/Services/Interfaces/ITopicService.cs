namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;


public interface ITopicService
{
    Task<List<Topic>> GetTopics();
    Task<List<TopicDto>> GetTopicDtos();
    Task<Guid> CreateTopic(Topic topic);
    Task<Topic?> GetTopicById(Guid topicId);
    Task<List<LectureEntryScore>> GetLeaderboardScoreListByTopicId(Guid topicId);
}
