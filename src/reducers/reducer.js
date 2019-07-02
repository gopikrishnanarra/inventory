const defaultState = {
    inventory: []
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'GET_MOVIES') {
        return {
            ...state,
            inventory: action.inventory
        };
    } else {
        return state
    }
};
export default reducers
