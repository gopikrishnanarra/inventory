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
    deleteInventory: () => dispatch(actions.deleteInventory()),
    openEditInventory: () => dispatch(actions.openEditInventory()),
    openDeleteInventory: () => dispatch(actions.openDeleteInventory()),
    closeEditInventory: () => dispatch(actions.closeEditInventory()),
    closeDeleteInventory: () => dispatch(actions.closeDeleteInventory()),
    deleteInventoryId: (id) => dispatch(actions.deleteInventoryId(id)),
    resetInventoryIds: () => dispatch(actions.resetInventoryIds()),
    login: (user) => dispatch(actions.login(user)),
    logout: () => dispatch(actions.logout()),
    forgot: (value) => dispatch(actions.forgot(value)),
    addNewUser: (value) => dispatch(actions.addUser(value)),
    getUsers: (users) => dispatch(actions.getUsers(users)),
    canGetUsers: () => dispatch(actions.canGetUsers()),

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
