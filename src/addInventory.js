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
            inventory: {},
            saveEnabled: false,
            itemDuplicated: false,
            addBlocked: false
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
            item: event.target.value,
            addBlocked: false,
            itemDuplicated: false
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
        const itemExists = this.state.list.find((o)=>{
            return o.item === this.state.item;
        });
        if(!itemExists && this.state.item.length) {
            this.setState({
                list: this.state.list.concat([{item: this.state.item, quantity: this.state.quantity, price: this.state.price}]),
                saveEnabled: true
            });
        }
        if(itemExists) {
            this.setState({
                addBlocked: true
            })
        }
        event.preventDefault();
    }

    reset() {
        this.setState({
            list: [],
            saveEnabled: false,
            addBlocked: false,
            itemDuplicated: false
        });
    }
    async saveInventory() {
        let array = [];
        this.state.list.forEach((obj) => {
            this.props.data.inventory.forEach((o) => {
                if(o.item.toLowerCase() === obj.item.toLowerCase()) {
                    array.push(obj.item);
                }
        });
        });
        if(array.length === 0) {
            await this.save();
        } else if(array.length > 0) {
            this.setState({
                itemDuplicated: true
            })
        }
    }

    async save() {
            const url = 'https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
            await axios.post(url, this.state.list);
            this.reset();
            this.props.fetchInventory();
    }

    render() {
        return (
            <div>
                <section className="centered">
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
                        <button className="button" type="submit">Add To Preview</button>
                    </form>
                    {this.state.addBlocked &&
                    <div className="warning">
                        this item is already added to the preview table
                    </div>
                    }
                    <h3 className="header">
                        PREVIEW
                    </h3>
                    <InventoryTable
                    props={this.props}
                    list={this.state.list}
                    />
                    <button className="button" onClick={this.reset}>reset</button>
                    {this.state.itemDuplicated &&
                    <div className="error">
                        one or more items are already exists in inventory list
                    </div>
                    }
                    <div>
                    <button className="button" onClick={this.saveInventory} disabled={!this.state.saveEnabled}>save</button>
                        <button className="button" onClick={this.props.closeAddInventory}>CLOSE</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddInventory;
