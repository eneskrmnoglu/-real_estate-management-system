using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;



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
            Console.WriteLine($"Received RealEstate object: {JsonConvert.SerializeObject(realEstate)}");

            if (!ModelState.IsValid)
            {
                  Console.WriteLine($"ModelState hataları: {JsonConvert.SerializeObject(ModelState)}");
                  return BadRequest(ModelState);
             }

    await repository.CreateAsync(realEstate);
    await repository.SaveChangesAsync();
    return CreatedAtAction("GetRealEstate", new { id = realEstate.Id }, realEstate);

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
            var realEstate = await repository.GetByIdAsync(id);
            if(realEstate == null) return NotFound();
            await repository.DeleteAsync(id);
            await repository.SaveChangesAsync();
            return NoContent();
        }

    }
}