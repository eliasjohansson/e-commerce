using System.Collections.Generic;
using System.Linq;
using API.Models;
using API.Repositories;


namespace API.Services
{
    public class UserService
    {
        private readonly UserRepository UserRepository;

        public UserService(UserRepository UserRepository)
        {
            this.UserRepository = UserRepository;
        }

        public List<User> Get()
        {
            return UserRepository.Get();
        }
        
        public User Get(int id)
        {
            return UserRepository.Get(id);
        }
        
        public User GetByUsername(string username)
        {
            return UserRepository.GetByUsername(username);
        }

        public bool Create(User user)
        {
            if (user == null) return false;
            if (!user.GetType().GetProperties().Any(p => p.GetValue(user) != null)) return false;
            
            UserRepository.Create(user);
            return true;

        }

        public bool Delete(int id)
        {
            if (UserRepository.Get(id) == null) return false;
            
            UserRepository.Delete(id);
            return true;
        }
    }
}