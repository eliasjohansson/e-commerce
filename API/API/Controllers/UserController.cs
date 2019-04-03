
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Models;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]s")]
    public class UserController : Controller
    {
        private string connectionString;
        private readonly UserService userService;
    
        public UserController(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConnectionString");
            userService = new UserService(new UserRepository(connectionString));
        }
    
        [HttpGet, Authorize]
        public IActionResult Get()
        {
            var users = userService.Get();
            return Ok(users);
        }
    
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userItem = userService.Get(id);
        
            if (userItem != null)
            {
                userItem.Password = null;
                return Ok(userItem);
            }

            return NotFound();
        }
        
        [HttpGet("me"), Authorize]
        public IActionResult GetMe()
        {
            int id;
            int.TryParse(this.User.Identity.Name, out id);
            var userItem = userService.Get(id);
        
            if (userItem != null)
            {
                userItem.Password = null;
                return Ok(userItem);
            }

            return NotFound();
        }
    
        
        [HttpPost("register")]
        public IActionResult Register([FromBody]User user)
        {
            var result = userService.Create(user);
            if (!result)
            {
                return BadRequest();
            }
            
            return Ok();
        }
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] User userInput)
        {
            var userItem = userService.GetByUsername(userInput.Username);
            
            if (userItem == null)
            {
                return NotFound();
            }
            
            PasswordHasher<string> pw = new PasswordHasher<string>();
            var verificationResult = pw.VerifyHashedPassword(userItem.Username, userItem.Password, userInput.Password);

            if (verificationResult == PasswordVerificationResult.Success)
            {
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("MinSuperHemligaHemlighet");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, userItem.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);

                // remove password before returning
                userItem.Password = null;
                return Ok(new { user = userItem, token = tokenHandler.WriteToken(token) });
            }

            return Unauthorized();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = userService.Delete(id);
           
            if (!result)
            {
                return NotFound();
            }
    
            return Ok();
        }
        
    }
}
