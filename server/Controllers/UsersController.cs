using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> repository;

        public UsersController(IRepository<User> repository)
        {
            this.repository = repository;
        }

        // GET: http://localhost:5298/api/Users/login?email={email}&password={password}
        [HttpGet("login")]
        public async Task<ActionResult<User>> GetUserByEmailAndPassword(string email, string password)
        {
            var users = await repository.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email == email && u.Password == password);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: http://localhost:5298/api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await repository.GetAllAsync());
        }

        // GET: http://localhost:5298/api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await repository.GetByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: http://localhost:5298/api/Users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            await repository.CreateAsync(user);
            await repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new {id = user.Id}, user);
        }

        // PUT: http://localhost:5298/api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, User user)
        {
            if(id != user.Id) return BadRequest();

            await repository.UpdateAsync(user);
            await repository.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: http://localhost:5298/api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await repository.GetByIdAsync(id);
            if(user == null) return NotFound();
            await repository.DeleteAsync(id);
            await repository.SaveChangesAsync();
            return NoContent();
        }
    }
}