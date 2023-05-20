namespace WebAPI.Services;

using WebAPI.Services.Interfaces;
using Data.Models;
using SFKR.DataAccess;
using System.Collections.Generic;

public class LectureService : ILectureService
{
    private readonly ILectureRepository _lectureRepository;
    public LectureService(ILectureRepository lectureRepository)
    {
        _lectureRepository = lectureRepository;
    }

    public async Task<Guid> CreateLecture(Lecture lecture)
    {
        return await _lectureRepository.CreateLecture(lecture);
    }

    public async Task<List<LectureDto>> GetLectureDtos()
    {
        return await _lectureRepository.GetLectureDtos();
    }

    public async Task<List<LectureDto>?> GetLectureDtosByTopicId(Guid topicId)
    {
        return await _lectureRepository.GetLectureDtosByTopicId(topicId);
    }

    public async Task<List<Lecture>> GetLectures()
    {
        return await _lectureRepository.GetLectures();
    }

    public async Task<Lecture?> GetLectureById(Guid lectureId)
    {
        return await _lectureRepository.GetLectureById(lectureId);
    }

    public async Task<int> GetContributionsCountForLecture(Guid lectureId)
    {
        return await _lectureRepository.GetContributionsCountForLecture(lectureId);
    }
}
