using System.Threading.Tasks;
using BIF4.SomeAngularDemo.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;
using BIF4.SomeAngularDemo.Models;
using System.Security.Claims;

namespace BIF4.SomeAngularDemo.Controllers
{
    [Route("api/todos")]
    public class ToDoController : Controller
    {
        private readonly ToDoDbContext dbContext;

        public ToDoController(ToDoDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        [Produces(typeof(ToDoItem))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetToDoItem(int id)
        {
            var item = await dbContext.ToDoItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(item);
            }
        }

        [HttpGet]
        [Produces(typeof(List<ToDoItem>))]
        public async Task<IActionResult> ListToDoItems()
        {
            var list = await dbContext.ToDoItems.OrderBy(item => item.CompleteUntil).ToListAsync();
            return Ok(list);
        }

        [HttpPatch("{id}")]
        [Authorize]
        public async Task<IActionResult> PatchToDoItem(int id, 
        JsonPatchDocument<ToDoItem> patchDocument)
        {
            var item = await dbContext.ToDoItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            patchDocument.ApplyTo(item);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> CreateToDoItem([FromBody] ToDoItemCreationData toDoItemCreationData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var toDoItem = new ToDoItem();

            toDoItem.Text = toDoItemCreationData.Text;
            toDoItem.CompleteUntil = toDoItemCreationData.CompleteUntil;

            var claims = User.Claims;
            toDoItem.UserSubject = claims.FirstOrDefault(x => x.Type == "sub")?.Value;
            toDoItem.Name = claims.FirstOrDefault(x => x.Type == "name")?.Value;
            toDoItem.Email = claims.FirstOrDefault(x => x.Type == "email")?.Value;

            dbContext.ToDoItems.Add(toDoItem);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetToDoItem), new { id = toDoItem.Id }, toDoItem);
        }
    }
}