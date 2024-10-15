using Microsoft.AspNetCore.Mvc;
using Play.Common.Service.Repositories;
using Play.Inventory.Service.Clients;
using Play.Inventory.Service.Dtos;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemController(IRepository<InventoryItem> inventoryItemRepository, IRepository<CatalogItem> catalogItemRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryItemDto>>> GetAsync(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("User ID cannot be empty.");
            }

            // Lấy tất cả items trong inventory của user mà trạng thái cập nhật là mới nhất.
            var items = await inventoryItemRepository.GetAllAsync(item => item.UserId == userId);

            var itemsId = items.Select(item => item.CatalogItemId).ToList(); // Chuyển đổi thành danh sách để sử dụng trong truy vấn

            var catalogItemEntities = await catalogItemRepository.GetAllAsync(item => itemsId.Contains(item.Id));

            var inventoryItemsDto = items.Select(inventoryItem =>
            {
                // Sử dụng FirstOrDefault thay vì Single để tránh lỗi nếu không tìm thấy
                var catalogItem = catalogItemEntities.FirstOrDefault(catalogItem => catalogItem.Id == inventoryItem.CatalogItemId);

                // Kiểm tra nếu catalogItem không tồn tại
                if (catalogItem == null)
                {
                    // Xử lý trường hợp không tìm thấy catalog item, có thể trả về null hoặc một giá trị mặc định
                    return inventoryItem.AsDto(catalogItem?.Name ?? "Unknown", catalogItem?.Description ?? "No description available");
                }

                return inventoryItem.AsDto(catalogItem.Name, catalogItem.Description);
            });

            return Ok(inventoryItemsDto);
        }


        [HttpPost]
        public async Task<ActionResult> PostAsync(GrantItemDto grantItemDto)
        {
            var inventoryItem = await inventoryItemRepository.GetAsync(
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

                await inventoryItemRepository.CreateAsync(inventoryItem);
            }
            else
            {
                inventoryItem.Quantity += grantItemDto.Quantity;
                await inventoryItemRepository.UpdateAsync(inventoryItem);
            }

            return Ok();
        }

    }
}