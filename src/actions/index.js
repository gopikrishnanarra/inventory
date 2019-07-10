export const getInventory = (inventory) => ({
    type: 'GET_INVENTORY',
    inventory: inventory
});
export const getEditedInventory = (inventory) => ({
    type: 'GET_EDITED_INVENTORY',
    inventory: inventory
});
export const openAddInventory = () => ({
    type: 'OPEN_ADD_INVENTORY'
});
export const closeAddInventory = () => ({
    type: 'CLOSE_ADD_INVENTORY'
});
export const openEditInventory = () => ({
    type: 'OPEN_EDIT_INVENTORY'
});
export const closeEditInventory = () => ({
    type: 'CLOSE_EDIT_INVENTORY'
});
export const addInventoryId = (id) => ({
    type: 'ADD_INVENTORY_ID',
    id: id
});
export const deleteInventoryId = (id) => ({
    type: 'DELETE_INVENTORY_ID',
    id: id
});
export const resetInventoryIds = () => ({
    type: 'RESET_INVENTORY_IDS'
});
export const editItem = (id, item) => ({
    type: 'EDIT_ITEM',
    id: id,
    item: item
});
export const editQuantity = (id, quantity) => ({
    type: 'EDIT_QUANTITY',
    id: id,
    quantity: quantity
});
export const editPrice = (id, price) => ({
    type: 'EDIT_PRICE',
    id: id,
    price: price
});
