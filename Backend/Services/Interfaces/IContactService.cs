using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface IContactService
    {
        public Task<ResponseData<Contact>> GetAllContactsAsync(DateTime? fromDate, DateTime? toDate, string searchString, int page, int size);
        public Task<Contact> RemoveContactAsync(int id);
        public Task<Contact> ChangeContactStatusAsync(int id, int status);
    }
}
