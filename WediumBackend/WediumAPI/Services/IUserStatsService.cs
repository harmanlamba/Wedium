using WediumAPI.Dto;

namespace WediumAPI.Service
{
    public interface IUserStatsService
    {
        public UserStatsDto GetUserStats(int userId);
    }
}
