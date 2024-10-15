using MassTransit;
using Play.Catalog.Contracts;
using Play.Common.Service.Repositories;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Consumer
{
    public class CatalogItemDeletedConumer(IRepository<CatalogItem> repository) : IConsumer<CatalogItemDeleted>
    {
        public async Task Consume(ConsumeContext<CatalogItemDeleted> context)
        {
            var message = context.Message;
            var item = await repository.GetAsync(message.ItemId);
            if (item != null)
            {
                return;
            }
            await repository.RemoveAsync(message.ItemId);
        }
    }
}