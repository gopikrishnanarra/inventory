const defaultState = {
    inventory: [],
    editedInventory: [],
    addEnabled: false,
    editEnabled: false,
    inventoryIds: [],
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'GET_INVENTORY') {
        return {
            ...state,
            inventory: action.inventory,
        };
    } else if (action.type === 'GET_EDITED_INVENTORY') {
        return {
            ...state,
            editedInventory: action.inventory
        };
    } else if (action.type === 'OPEN_ADD_INVENTORY') {
        return {
            ...state,
            addEnabled: true
        };
    } else if (action.type === 'CLOSE_ADD_INVENTORY') {
        return {
            ...state,
            addEnabled: false
        };
    } else if (action.type === 'OPEN_EDIT_INVENTORY') {
        return {
            ...state,
            editEnabled: true,
            addEnabled: false
        };
    } else if (action.type === 'CLOSE_EDIT_INVENTORY') {
        return {
            ...state,
            editEnabled: false,
            inventoryIds: []
        };
    } else if (action.type === 'ADD_INVENTORY_ID') {
        return {
            ...state,
            inventoryIds: state.inventoryIds.concat([action.id])
        };
    } else if (action.type === 'DELETE_INVENTORY_ID') {
        return {
            ...state,
            inventoryIds: state.inventoryIds.filter(id => id !== action.id)
        };
    } else if (action.type === 'RESET_INVENTORY_IDS') {
        return {
            ...state,
            inventoryIds: []
        };
    } else if (action.type === 'EDIT_ITEM') {
        return {
            ...state,
            editedInventory: state.editedInventory.map((inventory) => {
                if(inventory._id.$oid === action.id) {
                    inventory.item = action.item;
                    return inventory
                }
                return inventory
            })
        };
    } else if (action.type === 'EDIT_QUANTITY') {
        return {
            ...state,
            editedInventory: state.editedInventory.map((inventory) => {
                if(inventory._id.$oid === action.id) {
                    inventory.quantity = action.quantity;
                    return inventory
                }
                return inventory
            })
        };
    } else if (action.type === 'EDIT_PRICE') {
        return {
            ...state,
            editedInventory: state.editedInventory.map((inventory) => {
                if(inventory._id.$oid === action.id) {
                    inventory.price = action.price;
                    return inventory
                }
                return inventory
            })
        };
    } else {
        return state
    }
    };
export default reducers
