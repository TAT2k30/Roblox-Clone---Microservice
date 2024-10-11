using System.Linq.Expressions;
using MongoDB.Driver;
using Play.Common.Service.Entities;

namespace Play.Common.Service.Repositories
{
    public class MongoRepository<T>(IMongoDatabase database, string collectionName) : IRepository<T> where T : IEntity
    {
        private readonly IMongoCollection<T> dbCollection = database.GetCollection<T>(collectionName);
        private readonly FilterDefinitionBuilder<T> filterBuilder = Builders<T>.Filter;

        public async Task<IReadOnlyCollection<T>> GetAllAsync()
        {
            return await dbCollection.Find(filterBuilder.Empty).ToListAsync();
        }

        public async Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> filter)
        {
            return await dbCollection.Find(filter).ToListAsync();
        }

        public async Task<T> GetAsync(Guid id)
        {
            FilterDefinition<T> filter = filterBuilder.Eq(entity => entity.Id, id);
            return await dbCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
        {
            return await dbCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task CreateAsync(T item)
        {
            ArgumentNullException.ThrowIfNull(item);
            await dbCollection.InsertOneAsync(item);
        }

        public async Task UpdateAsync(T item)
        {
            ArgumentNullException.ThrowIfNull(item);
            FilterDefinition<T> filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            await dbCollection.ReplaceOneAsync(filter, item);
        }
        public async Task RemoveAsync(Guid id)
        {
            FilterDefinition<T> filter = filterBuilder.Eq(existingItem => existingItem.Id, id);
            await dbCollection.DeleteOneAsync(filter);
        }



    }
}