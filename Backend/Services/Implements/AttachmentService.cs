using DiscApi.Base;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class AttachmentService : IAttachmentService
    {
        private readonly IBaseRepository<Attachment> _baseAttachmentRepo;

        public AttachmentService(IBaseRepository<Attachment> baseAttachmentRepo)
        {
            _baseAttachmentRepo = baseAttachmentRepo;
        }

        public async Task<bool> AddAttachmentAsync(Attachment newAttachment)
        {
            try
            {
                var addResult = await _baseAttachmentRepo.AddAsync(newAttachment);
                if (addResult == null) return false;
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> RemoveAttachmentAsync(int id)
        {
           var attachmentExisting = await _baseAttachmentRepo.GetByIdAsync(id);
           if (attachmentExisting == null) throw new Exception($"The attachment with id = {id} was not found");
           var removeResult = await _baseAttachmentRepo.RemoveAsync(attachmentExisting);
           return removeResult.Id;
        }
    }
}
