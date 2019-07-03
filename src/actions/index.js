export const getInventory = (inventory) => ({
    type: 'GET_MOVIES',
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
