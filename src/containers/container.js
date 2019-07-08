import { connect } from 'react-redux'
import {
    getInventory,
    openAddInventory,
    closeAddInventory,
    openEditInventory,
    closeEditInventory,
    addInventoryId,
    editItem,
    editQuantity,
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
    addInventoryId: (id) => dispatch(addInventoryId(id)),
    editItem: (id, item) => dispatch(editItem(id, item)),
    editQuantity: (id, quantity) => dispatch(editQuantity(id, quantity)),
    editPrice: (id, price) => dispatch(editPrice(id, price)),
    openAddInventory: () => dispatch(openAddInventory()),
    closeAddInventory: () => dispatch(closeAddInventory()),
    openEditInventory: () => dispatch(openEditInventory()),
    closeEditInventory: () => dispatch(closeEditInventory())

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
