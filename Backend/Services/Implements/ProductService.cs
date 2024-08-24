using Castle.Components.DictionaryAdapter;
using DiscApi.Base;
using DiscApi.Constant;
using DiscApi.Extensions;
using DiscApi.Extentions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class ProductService : IProductService
    {
        private readonly IBaseRepository<Product> _baseRepository;
        private readonly IAttachmentService _attachmentService;
        private readonly ICategoryService _categoryService;

        public ProductService(IBaseRepository<Product> baseRepository,
            IAttachmentService attachmentService, ICategoryService categoryService)
        {
            _baseRepository = baseRepository;
            _attachmentService = attachmentService;
            _categoryService = categoryService;
        }

        public async Task<ResponseData<ProductResDTO>> GetAllProductsAsync(string searchString, int categoryId, int page, int size)
        {
            IEnumerable<Product> result = new List<Product>();
            if (searchString.Any())
            {
                var searchResult = await _baseRepository.SearchAsync(p => p.Name.Contains(searchString));
                if (searchResult == null) return new ResponseData<ProductResDTO>(new List<ProductResDTO>(),0);
                result = searchResult!;
            }
            else
            {
                result = await _baseRepository.GetAllAsync();
            }
            if (categoryId != 0)
            {
                var filterResult = result.Where(p => p.CategoryId == categoryId);
                if (filterResult == null) return new ResponseData<ProductResDTO>(new List<ProductResDTO>(), 0);
                result = filterResult!;
            }
            var totalPages = result.Count() % size > 0 ? result.Count() / size + 1 : result.Count() / size;

            var data = result!.Reverse().Skip((page - 1) * size).Take(size).Select(p => new ProductResDTO
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                CategoryId = p.CategoryId,
                Price = p.Price,
                Author = p.Author,
                Quantity = p.Quantity,
                IsActive = p.IsActive,
                CreatedAt = p.CreatedAt,
                Attachments = p?.Attachments,
                Category = p?.Category
            }).ToList();
            var response = new ResponseData<ProductResDTO>(data, totalPages);
            return response;
        }

        public async Task<Product> AddProductAsync(AddProductDTO form)
        {
            var categoryExist = await _categoryService.GetCategoryById(form.CategoryId);
            if (categoryExist == null) throw new Exception($"Category with id = {form.CategoryId} was not found");
            var newProduct = new Product
            {
                Name = form.Name,
                Description = form.Description,
                CategoryId = categoryExist.Id,
                Price = form.Price,
                Author = form.Author,
            };

            var addResult = await _baseRepository.AddAsync(newProduct);
            if (addResult != null)
            {
                if (form.Upload.Any())
                {
                    foreach (var item in form.Upload)
                    {
                        var newAttachment = new Attachment()
                        {
                            ProductId = addResult.Id,
                            Path = FileHelper.UploadFile(item),
                            Type = FileType.IMAGE
                        };
                        await _attachmentService.AddAttachmentAsync(newAttachment);
                    }
                }
            }
            return addResult;

        }

        public async Task<Product> GetProductById(int id)
        {
            var productExisting = await _baseRepository.GetByIdAsync(id);

            if (productExisting == null) throw new Exception($"Product with id = {id} was not found");
            return productExisting!;
        }

        public async Task<Product> UpdateProductAsync(UpdateProductDTO form)
        {
            var productExisting = await _baseRepository.GetByIdAsync(form.Id);
            if (productExisting == null) throw new CustomException(400, $"Product with id  = {form.Id} was not found");
            var categoryExisting = await _categoryService.GetCategoryById(form.CategoryId);
            if (categoryExisting == null) throw new CustomException(400, $"Category with id  = {form.CategoryId} was not found");
            productExisting.Name = form.Name;
            productExisting.Description = form.Description;
            productExisting.Author = form.Author;
            productExisting.Quantity = form.Quantity;
            productExisting.Price = form.Price;
            productExisting.CategoryId = form.CategoryId;
            var updateResult = await _baseRepository.UpdateAsync(productExisting);
            if (updateResult != null)
            {
                if (form.Upload.Any())
                {
                    if (updateResult.Attachments != null && updateResult.Attachments.Any())
                    {
                        foreach (var file in updateResult.Attachments!)
                        {
                            var removeResult = await _attachmentService.RemoveAttachmentAsync(file.Id);
                            if (removeResult != 0) FileHelper.RemoveFile(file.Path);

                        }
                    }

                    foreach (var item in form.Upload)
                    {
                        var newAttachment = new Attachment()
                        {
                            ProductId = updateResult.Id,
                            Path = FileHelper.UploadFile(item),
                            Type = FileType.IMAGE
                        };
                        await _attachmentService.AddAttachmentAsync(newAttachment);
                    }
                }
            }
            return updateResult!;
        }

        public async Task<bool> ToggleProductStatus(int id)
        {
            var productExisting = await _baseRepository.GetByIdAsync(id);
            if (productExisting == null) throw new CustomException(400, $"The product with id = {id} was not found");
            productExisting.IsActive = !productExisting.IsActive;
            var updateResult  = await _baseRepository.UpdateAsync(productExisting);
            return updateResult.IsActive;
        }
    }
}
