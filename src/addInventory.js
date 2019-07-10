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
            addBlocked: false
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
        this.state.list.forEach((o)=>{
            if(o.item === this.state.item) {
                console.log('addblocked', this.state.addBlocked)

                this.setState({
                    addBlocked: true
                }, ()=>{
                    console.log('addblocked', this.state.addBlocked)

                })
            }
        });
        if(!this.state.addBlocked) {
            this.setState({
                list: this.state.list.concat([{item: this.state.item, quantity: this.state.quantity, price: this.state.price}]),
                saveEnabled: true
            }, ()=>{
                console.log('item added')
            });
        }
        event.preventDefault();
    }

    reset() {
        this.setState({
            list: [],
            saveEnabled: false
        });
    }
    checkForDuplicates() {
        this.props.data.inventory.forEach((o) => {
            this.state.list.forEach((obj) => {
                if (o.item === obj.item) {
                    this.setState({
                        itemDuplicated: true
                    }, () => {
                        console.log(this.state.itemDuplicated)

                    })
                }
            })
        });
    }
    async saveInventory() {
        this.checkForDuplicates();
        await this.save();
    }

    async save() {
        if (!this.state.itemDuplicated) {
            console.log("saving")
            const url = 'https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
            await axios.post(url, this.state.list);
            this.reset();
            this.props.fetchInventory();
        }
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
                        <input type="submit" value="Add To Preview"/>
                    </form>
                    {this.state.addBlocked &&
                    <div className="warning">
                        this item is already added to the preview table
                    </div>
                    }
                    <button onClick={this.reset}>reset</button>
                    <h3>
                        PREVIEW
                    </h3>
                    <InventoryTable
                    props={this.props}
                    list={this.state.list}
                    />
                    {this.state.itemDuplicated &&
                    <div className="error">
                        one or more items are duplicated
                    </div>}
                    <div>
                    <button onClick={this.saveInventory} disabled={!this.state.saveEnabled}>save</button>
                        <button onClick={this.props.closeAddInventory}>CLOSE</button>
                    </div>
                </section>
            </div>


        );
    }
}

export default AddInventory;
