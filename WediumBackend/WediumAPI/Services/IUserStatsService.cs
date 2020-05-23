using WediumAPI.Dto;

namespace WediumAPI.Service
{
    public interface IUserStatsService
    {
        /// <summary>
        /// Get the statistics of the user given their user id
        /// </summary>
        /// <param name="userId"></param> The user id of the user for which the statistics are requested
        /// <returns></returns>
        public UserStatsDto GetUserStats(int userId);
    }
}
