import React from 'react';

import AddInventory from './addInventory'
import InventoryTable from './common/inventoryTable'
import './App.css'
import axios from "axios";

class App extends React.Component {
    componentDidMount() {
        fetch("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
            .then(res => res.json())
            .then(list => {
                this.props.getInventory(list);
            })
    }

    async saveEditInventory(id) {
        const list = this.props.data.editedInventory.filter(o => o._id.$oid === id);
        const payload = list[0];
        delete payload._id;
        const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory?_id=${id}apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
        return await axios.put(url, payload);
    }

    render() {
        return (
            <div>
                <div className={this.props.data.addEnabled ? "split left": "inventory"}>
                    <div className="centered">
                        <InventoryTable
                         props={this.props}
                        list={this.props.data.inventory}
                         save={this.saveEditInventory}
                        />
                        {!this.props.data.editEnabled &&
                            <div>
                        <button onClick={this.props.openAddInventory}>ADD INVENTORY</button>

                        <button onClick={this.props.openEditInventory}>EDIT INVENTORY</button>
                            </div>}
                        {this.props.data.editEnabled &&
                            <div>
                                <button onClick={this.props.closeEditInventory}>CLOSE</button>
                            </div>
                        }
                    </div>
                </div>

                {this.props.data.addEnabled &&
                <div className="split right">
                    <div className="centered">
                        <AddInventory {...this.props}/>
                    </div>
                </div>}
            </div>


        );
    }
}

export default App;
