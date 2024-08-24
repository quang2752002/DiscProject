using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Implements;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]

    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly ILogger<IdentityRole<int>> _logger;

        public ContactController(IContactService contactService, ILogger<IdentityRole<int>> logger)
        {
            _contactService = contactService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts(DateTime? fromDate = null, DateTime? toDate = null, string searchString = "", int page = 1, int size = 10)
        {
            try
            {
                var contacts = await _contactService.GetAllContactsAsync(fromDate, toDate, searchString, page, size);
                _logger.LogInformation("Get all contacts successfully");
                return Ok(contacts);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPatch("change-status/{id}")]
        public async Task<IActionResult> ChangeStatus([FromRoute] int id, [FromBody] ContactReqDTO reqBody)
        {
            try
            {
                var changeResult = await _contactService.ChangeContactStatusAsync(id, reqBody.Status);
                _logger.LogInformation("Change contact status successfully");
                return Ok(new Response(200, $"The status of contact with id ={changeResult.Id} has changed, current status: {changeResult.Status}"));
            }
            catch (CustomException e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status400BadRequest, new Response(400, e.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveContact([FromRoute] int id)
        {
            try
            {
                var removeResult = await _contactService.RemoveContactAsync(id);
                _logger.LogInformation("Remove contact successfully");
                return NoContent();
            }
            catch (CustomException e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status400BadRequest, new Response(400, e.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }
    }
}
