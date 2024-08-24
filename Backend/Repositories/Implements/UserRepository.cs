using DiscApi.Data;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscApi.Repositories.Implements
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> getUserId(string username)
        {
            var query=await _context.Users.Where(x=>x.UserName == username).FirstOrDefaultAsync();
            if (query != null)
                return query.Id;
            return 0;

        }
        public async Task<UserDTOResponse> getUser(int userId)
        {
            var query= await (from a in _context.Users
                              where a.Id == userId
                              select new UserDTOResponse
                              {
                                  name=a.UserName,
                                  firstName=a.FirstName,
                                  lastName=a.LastName,
                                  email=a.Email,
                                  phoneNumber=a.PhoneNumber
                              }).FirstOrDefaultAsync();
            return query;
        }
       
    }
}
