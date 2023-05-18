namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;


public interface ILectureService
{
    Task<Guid> CreateLecture(Lecture lecture);
    Task<List<Lecture>> GetLectures();
    Task<List<LectureDto>> GetLectureDtos();
    Task<List<LectureDto>?> GetLectureDtosByTopicId(Guid topicId);
    Task<Lecture?> GetLectureById(Guid lectureId);
}
