namespace WebAPI.Services;


using Microsoft.EntityFrameworkCore;
using WebAPI.Services.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using Autofac.Extras.DynamicProxy;
using Microsoft.AspNetCore.Mvc;
using Data;
using Data.Models;

public class TopicService : ITopicService
{
    private readonly ITopicRepository _topicRepository;
    public TopicService(ITopicRepository topicRepository)
    {
        _topicRepository = topicRepository;
    }

    public async Task<Guid> CreateTopic(Topic topic)
    {
        return await _topicRepository.CreateTopic(topic);
    }

    public async Task<List<LectureEntryScore>> GetLeaderboardScoreListByTopicId(Guid topicId)
    {
        return await _topicRepository.GetLeaderboardScoreListByTopicId(topicId);
    }

    public async Task<Topic?> GetTopicById(Guid topicId)
    {
        return await _topicRepository.GetTopicById(topicId);
    }

    public async Task<List<TopicDto>> GetTopicDtos()
    {
        return await _topicRepository.GetTopicDtos();
    }

    public async Task<List<Topic>> GetTopics()
    {
        return await _topicRepository.GetTopics();
    }
}
