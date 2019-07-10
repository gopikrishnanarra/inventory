import { connect } from 'react-redux'
import {
    getInventory,
    getEditedInventory,
    openAddInventory,
    closeAddInventory,
    fetchInventory,
    openEditInventory,
    closeEditInventory,
    addInventoryId,
    editItem,
    editQuantity,
    deleteInventoryId,
    resetInventoryIds,
    editPrice} from '../actions'
import App from '../App'
const getInventoryData = (data) => {
    return data;
};

function mapStateToProps(state) {
    return {
        data: getInventoryData(state.data)
    }}
const mapDispatchToProps = dispatch => ({
    getInventory: (inventory) => dispatch(getInventory(inventory)),
    getEditedInventory: (inventory) => dispatch(getEditedInventory(inventory)),
    addInventoryId: (id) => dispatch(addInventoryId(id)),
    editItem: (id, item) => dispatch(editItem(id, item)),
    editQuantity: (id, quantity) => dispatch(editQuantity(id, quantity)),
    editPrice: (id, price) => dispatch(editPrice(id, price)),
    openAddInventory: () => dispatch(openAddInventory()),
    closeAddInventory: () => dispatch(closeAddInventory()),
    fetchInventory: () => dispatch(fetchInventory()),
    openEditInventory: () => dispatch(openEditInventory()),
    closeEditInventory: () => dispatch(closeEditInventory()),
    deleteInventoryId: (id) => dispatch(deleteInventoryId(id)),
    resetInventoryIds: () => dispatch(resetInventoryIds())

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
