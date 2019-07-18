import { connect } from 'react-redux'
import * as actions from '../actions'
import App from '../App'
const getInventoryData = (data) => {
    return data;
};

function mapStateToProps(state) {
    return {
        data: getInventoryData(state.data)
    }}
const mapDispatchToProps = dispatch => ({
    getInventory: (inventory) => dispatch(actions.getInventory(inventory)),
    getEditedInventory: (inventory) => dispatch(actions.getEditedInventory(inventory)),
    addInventoryId: (id) => dispatch(actions.addInventoryId(id)),
    editItem: (id, item) => dispatch(actions.editItem(id, item)),
    editQuantity: (id, quantity) => dispatch(actions.editQuantity(id, quantity)),
    editPrice: (id, price) => dispatch(actions.editPrice(id, price)),
    openAddInventory: () => dispatch(actions.openAddInventory()),
    closeAddInventory: () => dispatch(actions.closeAddInventory()),
    fetchInventory: () => dispatch(actions.fetchInventory()),
    openEditInventory: () => dispatch(actions.openEditInventory()),
    closeEditInventory: () => dispatch(actions.closeEditInventory()),
    deleteInventoryId: (id) => dispatch(actions.deleteInventoryId(id)),
    resetInventoryIds: () => dispatch(actions.resetInventoryIds()),
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
    forgot: (value) => dispatch(actions.forgot(value)),
    addUser: () => dispatch(actions.addUser()),
    getUsers: (users) => dispatch(actions.getUsers(users)),
    canGetUsers: () => dispatch(actions.canGetUsers()),

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
