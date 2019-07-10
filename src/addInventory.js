import React from 'react';
import axios from 'axios'

import InventoryTable from './common/inventoryTable'
import './App.css'

class AddInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            quantity: '',
            price: '',
            list: [],
            inventory: {}
        };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.saveInventory = this.saveInventory.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleItemChange(event) {
        this.setState({
            item: event.target.value
        });
    }
    handleQuantityChange(event) {
        this.setState({
            quantity: event.target.value
        });
    }
    handlePriceChange(event) {
        this.setState({
            price: event.target.value
        });
    }

    handleAdd(event) {
        this.setState({
            list: this.state.list.concat([{item: this.state.item, quantity: this.state.quantity, price: this.state.price}]),
        });
        event.target.value = "";
        event.preventDefault();
    }

    reset(event) {
        this.setState({
            list: [],
        });
        event.preventDefault();
    }

    async saveInventory() {
        const url = 'https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
           await axios.post(url, this.state.list);
           this.props.fetchInventory();
    }

    render() {
        return (
            <div>
                <section>
                    <form onSubmit={this.handleAdd}>
                        <label>
                            Item:
                            <input type="text" onChange={this.handleItemChange}/>
                        </label>
                        <label>
                            Quantity:
                            <input type="text" onChange={this.handleQuantityChange}/>
                        </label>
                        <label>
                            Price$:
                            <input type="text" onChange={this.handlePriceChange}/>
                        </label>
                        <input type="submit" value="Add"/>
                    </form>
                    <button onClick={this.reset}>reset</button>
                    <InventoryTable
                    props={this.props}
                    list={this.state.list}
                    />
                    <div>
                    <button onClick={this.saveInventory}>save</button>
                        <button onClick={this.props.closeAddInventory}>CLOSE</button>
                    </div>
                </section>
            </div>


        );
    }
}

export default AddInventory;
