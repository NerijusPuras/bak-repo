
namespace SFKR.DataAccess;

using Data.Models;

public interface ILectureRepository
{
    Task<Guid> CreateLecture(Lecture lecture);
    Task<List<Lecture>> GetLectures();
    Task<List<LectureDto>> GetLectureDtos();
    Task<List<LectureDto>?> GetLectureDtosByTopicId(Guid topicId);
    Task<Lecture?> GetLectureById(Guid lectureId);
}

