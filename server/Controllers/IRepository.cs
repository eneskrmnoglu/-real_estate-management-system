using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    public interface IRepository<TEntity> where TEntity : class
    {
        // Veri tabanındaki tüm kayıtları getirir.
        Task<IEnumerable<TEntity>> GetAllAsync();
        // Veri tabanında beliritlen ID'ye sahip kaydı getirir.
        Task<TEntity> GetByIdAsync(Guid id);
        // Yeni bir kayıt eklemek için.
        Task CreateAsync(TEntity entity);
        // Belirtilen kaydı güncellemek için.
        Task UpdateAsync(TEntity entity);
        // Belirtilen ID'ye sahip kaydı veri tabanından siler.
        Task DeleteAsync(Guid id);
        // Değişikleri veritabanında uygular.
        Task SaveChangesAsync();
    }
}