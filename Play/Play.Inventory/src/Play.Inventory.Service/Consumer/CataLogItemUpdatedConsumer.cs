using MassTransit;
using Play.Catalog.Contracts;
using Play.Common.Service.Repositories;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Consumer
{
    public class CatalogItemUpdatedConumer(IRepository<CatalogItem> repository) : IConsumer<CatalogItemUpdated>
    {
        public async Task Consume(ConsumeContext<CatalogItemUpdated> context)
        {
            var message = context.Message;
            var item = await repository.GetAsync(message.ItemId);
            if (item != null)
            {
                item = new CatalogItem
                {
                    Id = message.ItemId,
                    Name = message.Name,
                    Description = message.Descriotion
                };
                await repository.CreateAsync(item);
            }
            else
            {
                item = new CatalogItem
                {
                    Id = message.ItemId,
                    Name = message.Name,
                    Description = message.Descriotion
                };
                await repository.UpdateAsync(item);
            }
        }
    }
}