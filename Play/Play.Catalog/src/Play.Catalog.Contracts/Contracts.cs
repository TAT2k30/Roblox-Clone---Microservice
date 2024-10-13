using System;

namespace Play.Catalog.Contracts
{
    public record CatalogItemCreated(Guid ItemId, string Name, string Descriotion);
    public record CatalogItemUpdated(Guid ItemId, string Name, string Descriotion);
    public record CatalogItemDeleted(Guid ItemId);

}