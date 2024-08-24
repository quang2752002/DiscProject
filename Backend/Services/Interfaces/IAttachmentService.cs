using DiscApi.Models.Entities;
namespace DiscApi.Services.Interfaces
{
    public interface IAttachmentService
    {
        public Task<bool> AddAttachmentAsync(Attachment newAttachment);
        public Task<int> RemoveAttachmentAsync(int id);
    }
}
