using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        // ApplicationDbContext referansı alınır.
        private readonly ApplicationDbContext context;
        
        // TEntrity tipinde DbSet referansı alınır.
        private readonly DbSet<TEntity> _dbSet;

        public Repository(ApplicationDbContext context)
        {
            this.context = context;
            _dbSet = context.Set<TEntity>();
        }
        
        //Yeni bir kayıt eklemek için.
        public async Task CreateAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        // Belirtilen Id'ye sahip kaydı veri tabanından siler.
        public async Task DeleteAsync(Guid id)
        {
            TEntity entity = await GetByIdAsync(id);
            if(entity != null)
            {
                _dbSet.Remove(entity);
            }
        }

        // Veri tabanındaki tüm kayıtları getirir.
        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        // Veri tabanında belirtilen ID'ye sahip kaydı getirir.
        public async Task<TEntity> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        //Belirtilen  kaytın güncellenmesi için kullanılır.
        public Task UpdateAsync(TEntity entity)
        {
            _dbSet.Update(entity);
            return Task.CompletedTask;
        }
    }
}