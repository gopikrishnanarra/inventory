import React from 'react';

import AddInventory from './addInventory'
import InventoryTable from './common/inventoryTable'
import './App.css'
import axios from "axios";

function fetchInventory() {
    fetch("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
        .then(res => res.json())
        .then(list => {
            this.props.getInventory(list);
        });
}

class App extends React.Component {
    componentDidMount() {
        fetchInventory.call(this)
        fetch("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
            .then(res => res.json())
            .then(list => {
                this.props.getEditedInventory(list);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.getNewInventory) {
            fetchInventory.call(this);
        }
    }

    async saveEditInventory(id) {
        const list = this.props.data.editedInventory.filter(o => o._id.$oid === id);
        const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory?_id=${id}apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
        try {
            await axios.put(url, list[0]);
            this.props.deleteInventoryId(id);
        } catch (e){
            this.props.deleteInventoryId(id);
            console.log(e.error.message)
        }
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
                         deleteInventoryId={this.props.deleteInventoryId}
                        />
                        {!this.props.data.editEnabled &&
                        <section>
                            <div>
                                 <button className="button" onClick={this.props.openAddInventory}>ADD INVENTORY</button>
                            </div>
                            <div>
                                 <button className="button" onClick={this.props.openEditInventory}>EDIT INVENTORY</button>
                            </div>
                        </section>
                        }
                        {this.props.data.editEnabled &&
                            <div>
                                <button className="button" onClick={this.props.closeEditInventory}>CLOSE</button>
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
