using Microsoft.AspNetCore.Mvc;
using Play.Common.Service.Repositories;
using Play.Inventory.Service.Clients;
using Play.Inventory.Service.Dtos;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemController(IRepository<InventoryItem> itemsPreository, CatalogClient catalogClient) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryItemDto>>> GetAsync(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("User ID cannot be empty.");
            }
            //Lấy tất cả items trong inventory của user mà trạng thái cập nhật là mới nhất.
            var catalogItems = await catalogClient.GetCatalogItemAsync();
            var items = (await itemsPreository.GetAllAsync(items => items.UserId == userId))
                        .Select(items => items)
                        .OrderByDescending(items => items.AcquiredDate);

            var inventoryIntemsDto = items.Select(inventoryIntem =>
            {
                var catalogItem = catalogItems.Single(catalogItem => catalogItem.Id == inventoryIntem.CatalogItemId);
                return inventoryIntem.AsDto(catalogItem.Name, catalogItem.Description);
            });

            return Ok(inventoryIntemsDto);
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync(GrantItemDto grantItemDto)
        {
            var inventoryItem = await itemsPreository.GetAsync(
                items => items.UserId == grantItemDto.UserId && items.CatalogItemId == grantItemDto.CatalogItemId
            );

            if (inventoryItem == null)
            {
                inventoryItem = new InventoryItem
                {
                    CatalogItemId = grantItemDto.CatalogItemId,
                    UserId = grantItemDto.UserId,
                    Quantity = grantItemDto.Quantity,
                    AcquiredDate = DateTimeOffset.UtcNow
                };

                await itemsPreository.CreateAsync(inventoryItem);
            }
            else
            {
                inventoryItem.Quantity += grantItemDto.Quantity;
                await itemsPreository.UpdateAsync(inventoryItem);
            }

            return Ok();
        }

    }
}