const defaultState = {
    inventory: [],
    previewList: [],
    editedInventory: [],
    addEnabled: false,
    editEnabled: false,
    inventoryEnabled: false,
    inventoryIds: [],
    getNewInventory: false,
    loggedIn: false,
    forgot: false,
    canGetUsers: false,
    users: [],
    addUser: false,
    itemDuplicated: false,
    user: {},
    deleted: false,
    edited: false
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            loggedIn: true,
            getLoginPage: false,
            user: action.user
        };
    } else if (action.type === 'LOGOUT') {
        return {
            ...state,
            loggedIn: false,
            getLoginPage: false,
            canGetUsers: true
        };
    } else if (action.type === 'GET_LOGIN') {
        return {
            ...state,
            getLoginPage: true,
            canGetUsers: true
        };
    }  else if (action.type === 'ADD_USER') {
        return {
            ...state,
            addUser: action.value
        };
    }  else if (action.type === 'DUPLICATED_ITEM') {
        return {
            ...state,
            itemDuplicated: action.value
        };
    } else if (action.type === 'FORGOT') {
        return {
            ...state,
            forgot: action.value
        };
    } else if (action.type === 'GET_INVENTORY') {
        return {
            ...state,
            inventory: action.inventory,
            getNewInventory: false,
            edited: false,
            deleted: false
        };
    } else if (action.type === 'PREVIEW_LIST') {
        return {
            ...state,
            previewList: state.previewList.concat(action.list)
        };
    } else if (action.type === 'EDIT_PREVIEW_LIST') {
        return {
            ...state,
            previewList: state.previewList.filter(o => o.item !== action.object.item)
        };
    } else if (action.type === 'RESET_PREVIEW_LIST') {
        return {
            ...state,
            previewList: []
        };
    } else if (action.type === 'GET_USERS') {
        return {
            ...state,
            users: action.users,
            canGetUsers: false
        };
    } else if (action.type === 'GET_EDITED_INVENTORY') {
        return {
            ...state,
            editedInventory: action.inventory,
            edited: false,
            deleted: false
        };
    } else if (action.type === 'OPEN_ADD_INVENTORY') {
        return {
            ...state,
            addEnabled: true,
            inventoryEnabled: false
        };
    } else if (action.type === 'CLOSE_ADD_INVENTORY') {
        return {
            ...state,
            addEnabled: false,
            inventoryEnabled: true
        };
    } else if (action.type === 'FETCH_INVENTORY') {
        return {
            ...state,
            getNewInventory: true
        };
    } else if (action.type === 'DELETE_INVENTORY') {
        return {
            ...state,
            deleted: true
        };
    }  else if (action.type === 'EDIT_INVENTORY') {
        return {
            ...state,
            edited: true
        };
    } else if (action.type === 'CAN_GET_USERS') {
        return {
            ...state,
            canGetUsers: true
        };
    } else if (action.type === 'OPEN_EDIT_INVENTORY') {
        return {
            ...state,
            editEnabled: true,
            addEnabled: false,
            inventoryEnabled: false
        };
    }  else if (action.type === 'OPEN_INVENTORY') {
        return {
            ...state,
            editEnabled: false,
            addEnabled: false,
            inventoryEnabled: true
        };
    } else if (action.type === 'CLOSE_EDIT_INVENTORY') {
        return {
            ...state,
            editEnabled: false,
            inventoryIds: [],
            getNewInventory: true,
            inventoryEnabled: true
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
