import { connect } from 'react-redux'
import { getInventory } from '../actions'
import App from '../App'
const getInventoryData = (data) => {
    return data;
};

function mapStateToProps(state) {
    return {
        data: getInventoryData(state.data)
    }}
const mapDispatchToProps = dispatch => ({
    getInventory: (inventory) => dispatch(getInventory(inventory))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
