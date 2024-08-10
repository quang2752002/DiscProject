
using DiscApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DiscApi.Base
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext _dbContext;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        /**
         * Retrieves an entity by its ID.
         * @param id The ID of the entity.
         * @return The entity with the specified ID.
         */
        public async Task<T> GetByIdAsync(int id)
        {
            T entity = await _dbSet.FindAsync(id);
            return entity; 
        }

        /**
         * Retrieves all entities.
         * @return A list of all entities.
         */
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entityList = await _dbSet.ToListAsync();
            return entityList;
        }

        /**
         * Adds a new entity.
         * @param entity The entity to be added.
         * @return The added entity.
         */
        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        /**
         * Updates an existing entity.
         * @param entity The entity to be updated.
         * @return The updated entity.
         */
        public async Task<T> UpdateAsync(T entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        /**
         * Removes an entity.
         * @param entity The entity to be removed.
         * @return The ID of the removed entity.
         */
        public async Task<int> RemoveAsync(T entity)
        {
            _dbContext.Remove(entity);
            await _dbContext.SaveChangesAsync();
            return entity.Id;
        }

        /**
         * Searches for entities based on a predicate.
         * @param predicate The search criteria.
         * @return A list of entities that match the search criteria.
         */
        public async Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> predicate)
        {
            var result = await _dbSet.Where(predicate).ToListAsync();
            return result;
        }   
       
    }
}
