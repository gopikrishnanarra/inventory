import { connect } from 'react-redux'
import {
    getInventory,
    openAddInventory,
    closeAddInventory,
    openEditInventory,
    closeEditInventory} from '../actions'
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
    openAddInventory: () => dispatch(openAddInventory()),
    closeAddInventory: () => dispatch(closeAddInventory()),
    openEditInventory: () => dispatch(openEditInventory()),
    closeEditInventory: () => dispatch(closeEditInventory())

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
