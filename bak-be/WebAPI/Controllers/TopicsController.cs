namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WebAPI.Services.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class TopicsController : ControllerBase
{
    private readonly ITopicService _topicService;
    private readonly ILectureService _lectureService;
    private readonly ILectureEntryScoreService _lectureEntryScoreService;

    public TopicsController(
        ITopicService topicService,
        ILectureService lectureService,
        ILectureEntryScoreService lectureEntryScoreService)
    {
        _topicService = topicService;
        _lectureService = lectureService;
        _lectureEntryScoreService = lectureEntryScoreService;
    }

    [HttpGet]
    public async Task<List<TopicDto>> GetTopicDtos()
    {
        return await _topicService.GetTopicDtos();
    }

    [HttpPost]
    public async Task<IActionResult> CreateDefaultTopic()
    {
        var topic = new Topic
        {
            Created = DateTime.Now,
            Modified = DateTime.Now,
            Title = "Default POST"
        };

        var topicId = await _topicService.CreateTopic(topic);

        return Ok(topicId);
    }

    [HttpGet("{topicId}")]
    public async Task<Topic?> GetTopicByTopicIdAsync([FromRoute] Guid topicId)
    {
        return await _topicService.GetTopicById(topicId);
    }

    [HttpGet("{topicId}/Lectures")]
    public async Task<List<LectureDto>?> GetLectureDtosByTopicId([FromRoute] Guid topicId)
    {
        return await _lectureService.GetLectureDtosByTopicId(topicId);
    }

    [HttpGet("Leaderboard")]
    public async Task<List<MainLectureEntryScore>> GetOverallLeaderboardScoreList()
    {
        return await _lectureEntryScoreService.GetOverallLeaderboardScoreList();
    }

    [HttpGet("{topicId}/Leaderboard")]
    public async Task<List<LectureEntryScore>> GetLeaderboardScoreListByTopicId([FromRoute] Guid topicId)
    {
        return await _topicService.GetLeaderboardScoreListByTopicId(topicId);
    }
}
