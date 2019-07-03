const defaultState = {
    inventory: [],
    addEnabled: false,
    editEnabled: false
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'GET_MOVIES') {
        return {
            ...state,
            inventory: action.inventory
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
            editEnabled: true
        };
    } else if (action.type === 'CLOSE_EDIT_INVENTORY') {
        return {
            ...state,
            editEnabled: false
        };
    } else {
        return state
    }
    };
export default reducers
