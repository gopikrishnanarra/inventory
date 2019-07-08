const defaultState = {
    inventory: [],
    editedInventory: [],
    addEnabled: false,
    editEnabled: false,
    inventoryIds: [],
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'GET_MOVIES') {
        return {
            ...state,
            inventory: action.inventory,
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
            editEnabled: false
        };
    } else if (action.type === 'ADD_INVENTORY_ID') {
        console.log(action);
        return {
            ...state,
            inventoryIds: state.inventoryIds.concat([action.id])
        };
    } else if (action.type === 'EDIT_ITEM') {
        console.log(action);
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
        console.log(action);
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
        console.log(action);
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
