using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bif4.Schiermayer.MyApp.Controllers
{
    [Route("api/lv")]
    public class LVController : Controller
    {
        private readonly LvDbContext dbContext;

        public LVController(LvDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Produces(typeof(List<Lehrveranstaltung>))]
        public async Task<IActionResult> ListLVs()
        {
            var list = await dbContext.Lehrveranstaltungen.OrderBy(item => item.Abbreviation).ToListAsync();
            return Ok(list);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> CreateLV([FromBody] Lehrveranstaltung LV)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            LV.ID = 0;

            var claims = User.Claims;
            LV.UserSubject = claims.FirstOrDefault(x => x.Type == "sub")?.Value;
            LV.UserName = claims.FirstOrDefault(x => x.Type == "name")?.Value;
            LV.UserEmail = claims.FirstOrDefault(x => x.Type == "email")?.Value;

            dbContext.Lehrveranstaltungen.Add(LV);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLV), new { id = LV.ID }, LV);
        }

        [HttpGet("{id}")]
        [Produces(typeof(Lehrveranstaltung))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetLV(int id)
        {
            var item = await dbContext.Lehrveranstaltungen.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(item);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteLV(int id)
        {
            var item = await dbContext.Lehrveranstaltungen.FindAsync(id);
            var currentUserSubject = User.Claims.FirstOrDefault(x => x.Type == "sub")?.Value;

            if (item == null)
            {
                return NotFound();
            }
            else if (item.UserSubject == currentUserSubject)
            {
                dbContext.Lehrveranstaltungen.Remove(item);
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return Forbid();
            }
        }
    }
}
