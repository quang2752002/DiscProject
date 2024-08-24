using DiscApi.Base;
using DiscApi.Constant;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class ContactService : IContactService
    {
        private readonly IBaseRepository<Contact> _baseContactRepo;

        public ContactService(IBaseRepository<Contact> baseContactRepo)
        {
            _baseContactRepo = baseContactRepo;
        }

        public async Task<ResponseData<Contact>> GetAllContactsAsync(DateTime? fromDate, DateTime? toDate, string searchString, int page, int size)
        {
            IEnumerable<Contact> result = new List<Contact>();
            if(fromDate != null && toDate != null || searchString.Any())
            {
                if (fromDate != null && toDate != null)
                {
                    result = await _baseContactRepo.SearchAsync(c => c.CreatedAt >= fromDate && c.CreatedAt <= toDate);
                    if (!result.Any()) return new ResponseData<Contact>(new List<Contact>(), 0);
                }

                if (searchString.Any())
                {

                    result = result.Any() ? result.Where(c => c.Subject.ToUpper().Contains(searchString.ToUpper()))
                            : await _baseContactRepo.SearchAsync(c => c.Subject.ToUpper().Contains(searchString.ToUpper()));
                    if (!result.Any()) return new ResponseData<Contact>(new List<Contact>(), 0);
                }
            }
            else
            {
                result = await _baseContactRepo.GetAllAsync();
            }
            var totalPages = result.Count() % size > 0 ? result.Count() / size + 1 : result.Count() / size;
            var data = result!.Reverse().Skip((page - 1) * size).Take(size).Reverse().ToList();
            var response = new ResponseData<Contact>(data, totalPages);
            return response;
        }

        public async Task<Contact> RemoveContactAsync(int id)
        {
            if (id <= 0) throw new CustomException(400, $"The contact with id = {id} was not found");
            var contactExsiting = await _baseContactRepo.GetByIdAsync(id);
            if (contactExsiting == null) throw new CustomException(400, $"The contact with id = {id} was not found");
            var removeResult = await _baseContactRepo.RemoveAsync(contactExsiting);
            return removeResult;
        }
        public async Task<Contact> ChangeContactStatusAsync(int id, int status)
        {
            var contactExsiting = await _baseContactRepo.GetByIdAsync(id);
            if (contactExsiting == null) throw new CustomException(400, $"The contact with id = {id} was not found");
            switch (status)
            {
                case 1:
                    contactExsiting.Status = ContactStatus.NOT_PROCESSED;
                    break;
                case 2:
                    contactExsiting.Status = ContactStatus.PROCESSING;
                    break;
                case 3:
                    contactExsiting.Status = ContactStatus.PROCESSED;
                    break;
            }
            var updateResult = await _baseContactRepo.UpdateAsync(contactExsiting);
            return updateResult;
        }

    }
}
