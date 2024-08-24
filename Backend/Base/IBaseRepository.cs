using System.Linq.Expressions;

namespace DiscApi.Base
{
    public interface IBaseRepository<T>
    where T : class
    {
        public Task<T> GetByIdAsync(int id);

        public Task<IEnumerable<T>> GetAllAsync();

        public Task<T> AddAsync(T entity);


        public Task<T> UpdateAsync(T entity);

        public Task<T> RemoveAsync(T entity);

        public Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> predicate);
    }
}
