export const login = (user) => ({
    type: 'LOGIN',
    user: user
});
export const logout = () => ({
    type: 'LOGOUT'
});
export const welcomePage = (value) => ({
    type: 'GET_LOGIN',
    value: value
});
export const addUser = (value) => ({
    type: 'ADD_USER',
    value: value
});
export const duplicatedItem = (value) => ({
    type: 'DUPLICATED_ITEM',
    value: value
});
export const forgot = (value) => ({
    type: 'FORGOT',
    value: value
});
export const getUsers = (users) => ({
    type: 'GET_USERS',
    users: users
});
export const getInventory = (inventory) => ({
    type: 'GET_INVENTORY',
    inventory: inventory
});
export const filteredInventory = (inventory) => ({
    type: 'FILTERED_INVENTORY',
    inventory: inventory
});
export const previewList = (list) => ({
    type: 'PREVIEW_LIST',
    list: list
});
export const editPreview = (object) => ({
    type: 'EDIT_PREVIEW_LIST',
    object: object
});
export const resetPreviewList = () => ({
    type: 'RESET_PREVIEW_LIST'
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
export const fetchInventory = () => ({
    type: 'FETCH_INVENTORY'
});
export const deleteInventory = () => ({
    type: 'DELETE_INVENTORY'
});
export const editInventory = () => ({
    type: 'EDIT_INVENTORY'
});
export const canGetUsers = () => ({
    type: 'CAN_GET_USERS'
});
export const openEditInventory = () => ({
    type: 'OPEN_EDIT_INVENTORY'
});
export const openInventory = () => ({
    type: 'OPEN_INVENTORY'
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
