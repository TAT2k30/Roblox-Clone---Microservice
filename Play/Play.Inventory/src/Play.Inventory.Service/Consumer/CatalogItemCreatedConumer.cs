using MassTransit;
using Play.Catalog.Contracts;
using Play.Common.Service.Repositories;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Consumer
{
    public class CatalogItemCreatedConumer(IRepository<CatalogItem> repository) : IConsumer<CatalogItemCreated>
    {
        public async Task Consume(ConsumeContext<CatalogItemCreated> context)
        {
            var message = context.Message;
            var item = await repository.GetAsync(message.ItemId);
            if (item != null)
            {
                return;
            }

            item = new CatalogItem
            {
                Id = message.ItemId,
                Name = message.Name,
                Description = message.Descriotion
            };
            await repository.CreateAsync(item);
        }
    }
}