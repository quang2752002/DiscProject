using DiscApi.Base;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class TypeService : ITypeService
    {
        private readonly IBaseRepository<Models.Entities.Type> _baseTypeRepo;
        private readonly IBaseRepository<Category> _baseCategoryRepo;
        private readonly IBaseRepository<CategoryType> _baseCategoryTypeRepo;

        public TypeService(IBaseRepository<Models.Entities.Type> baseTypeRepo, IBaseRepository<Category> baseCategoryRepo,
            IBaseRepository<CategoryType> baseCategoryTypeRepo)
        {
            _baseTypeRepo = baseTypeRepo;
            _baseCategoryRepo = baseCategoryRepo;
            _baseCategoryTypeRepo = baseCategoryTypeRepo;
        }

        public async Task<ResponseData<TypeResDTO>> GetAllTypesAsync(string searchString, int page, int size)
        {
            IEnumerable<Models.Entities.Type> result = new List<Models.Entities.Type>();
            if (searchString.Any())
            {
                var searchResult = await _baseTypeRepo.SearchAsync(p => p.Name.Contains(searchString));
                if (searchResult == null) return new ResponseData<TypeResDTO>(new List<TypeResDTO>(), 0);
                result = searchResult!;
            }
            else
            {
                result = await _baseTypeRepo.GetAllAsync();
            }
            var totalPages = result.Count() % size > 0 ? result.Count() / size + 1 : result.Count() / size;
            result = result!.Skip((page - 1) * size).Take(size);
            var response = new ResponseData<TypeResDTO>(new List<TypeResDTO>(), totalPages);
            foreach (var type in result)
            {
                var categories = type.CategoryTypes?.Where(ct => ct.TypeId == type.Id).Select(ct => ct.Category).ToList();
                var item = new TypeResDTO()
                {
                    Id = type.Id,
                    Name = type.Name,
                    Description = type.Description,
                    IsActive = type.IsActive,
                    Category = categories
                };
                response.Data.Add(item);
            }
            return response;
        }
        public async Task<Models.Entities.Type> CreateTypeAsync(TypeReqDTO typeData)
        {
            foreach (int categoryId in typeData.CategoryIds)
            {
                var categoryExisting = await _baseCategoryRepo.GetByIdAsync(categoryId);
                if (categoryExisting == null) throw new CustomException(400, $"The category with id = {categoryId} was not found");
            }
            var newType = new Models.Entities.Type()
            {
                Name = typeData.Name,
                Description = typeData.Description,
            };
            var addResult = await _baseTypeRepo.AddAsync(newType);
            foreach (int categoryId in typeData.CategoryIds)
            {
                var newCategoryType = new CategoryType()
                {
                    CategoryId = categoryId,
                    TypeId = addResult.Id,

                };
                await _baseCategoryTypeRepo.AddAsync(newCategoryType);
            }
            return addResult;
        }

        public async Task<Models.Entities.Type> UpdateTypeAsync(int id, TypeReqDTO typeData)
        {
            var typeExsting = await _baseTypeRepo.GetByIdAsync(id);
            if (typeExsting == null) throw new CustomException(400, $"The type with id = {id} was not found");
            foreach (int categoryId in typeData.CategoryIds)
            {
                var categoryExisting = await _baseCategoryRepo.GetByIdAsync(categoryId);
                if (categoryExisting == null) throw new CustomException(400, $"The category with id = {categoryId} was not found");
            }
            typeExsting.Name = typeData.Name;
            typeExsting.Description = typeData.Description;
            typeExsting?.CategoryTypes?.Clear();
            var updateResult = await _baseTypeRepo.UpdateAsync(typeExsting!);
            foreach (int categoryId in typeData.CategoryIds)
            {
                var newCategoryType = new CategoryType()
                {
                    CategoryId = categoryId,
                    TypeId = updateResult.Id,

                };
                await _baseCategoryTypeRepo.AddAsync(newCategoryType);
            }
            return updateResult;
        }
        public async Task<Models.Entities.Type> ToggleTypeStatusAsync(int id)
        {
            var typeExsting = await _baseTypeRepo.GetByIdAsync(id);
            if (typeExsting == null) throw new CustomException(400, $"The type with id = {id} was not found");
            typeExsting.IsActive = !typeExsting.IsActive;
            var updateResult = await _baseTypeRepo.UpdateAsync(typeExsting!);
            return updateResult;
        }
    }

}

