using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RealEstateController : ControllerBase
    {
        private readonly IRepository<RealEstate> repository;

        public RealEstateController(IRepository<RealEstate> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RealEstate>>> GetRealEstates()
        {
            return Ok(await repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RealEstate>> GetRealEstate(Guid id)
        {
            var estate = await repository.GetByIdAsync(id);
            if(estate == null)
            {
                return NotFound();
            }
            return Ok(estate);
        }

        [HttpPost]
        public async Task<ActionResult<RealEstate>> CreateRealEstate(RealEstate realEstate)
        {
            await repository.CreateAsync(realEstate);
            await repository.SaveChangesAsync();
            return CreatedAtAction(nameof(realEstate), new {id = realEstate.Id}, realEstate);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRealEstate(Guid id, RealEstate realEstate)
        {
            if(id != realEstate.Id) return BadRequest();

            await repository.UpdateAsync(realEstate);
            await repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRealEstate(Guid id)
        {
            var realEstate = repository.GetByIdAsync(id);
            if(realEstate == null) return NotFound();
            await repository.DeleteAsync(id);
            await repository.SaveChangesAsync();
            return NoContent();
        }

    }
}