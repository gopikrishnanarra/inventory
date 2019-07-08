import React from 'react';

import AddInventory from './addInventory'
import InventoryTable from './common/inventoryTable'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        fetch("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
            .then(res => res.json())
            .then(list => {
                this.props.getInventory(list);
            })
    }

    render() {
        console.log('edited', this.props.data.editedInventory);
        return (
            <div>
                <div className={this.props.data.addEnabled ? "split left": "inventory"}>
                    <div className="centered">
                        <InventoryTable
                         props={this.props}
                        list={this.props.data.inventory}
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
