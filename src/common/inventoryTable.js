import React from 'react';

import '../App.css'
import axios from "axios";


export default class InventoryTable extends React.Component {
constructor(props) {
    super(props);
    this.state = {

    };
    this.handleItem = this.handleItem.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

}

    async saveEditInventory(id, inventory) {
    const list = inventory.filter(o => o._id === id);
    console.log('to be saved', list[0]);
        const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory?_id=${id}apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
        return await axios.put(url, list[0]);
    }
    addInventoryId(object) {
        if (!this.props.props.data.inventoryIds.includes(object._id.$oid)) {
            this.props.props.addInventoryId(object._id.$oid)
        }
    }

    handleItem(object, event) {
    this.addInventoryId(object);
        this.props.props.editItem(object._id.$oid, event.target.value)

    }
    handleQuantity(object, event) {
        this.addInventoryId(object);
        this.props.props.editQuantity(object._id.$oid, event.target.value)

    }
    handlePrice(object, event) {
        this.addInventoryId(object);
        this.props.props.editPrice(object._id.$oid, event.target.value)

    }

    async onSave(id) {
        await this.saveEditInventory(id, this.props.props.data.editedInventory)
    }

    getSaveButton(obj) {
    console.log(this.props.props.data.inventoryIds);
        if (this.props.props.data.inventoryIds.includes(obj._id.$oid)) {
            return (
                <button onClick={this.onSave(obj._id.$oid)}>save</button>
            )
        }
        return null;
    }

    getList() {

        return this.props.list.map((object) => {
            if(this.props.props.data.editEnabled) {
                return (
                    <tr className="td">
                        <td className="td">
                            <input type="text" onChange={(event) => this.handleItem(object, event)} placeholder={object.item}/>
                        </td>
                        <td className="td">
                            <input type="text" onChange={(event) => this.handleQuantity(object, event)} placeholder={object.quantity}/>
                        </td>
                        <td className="td">
                            <input type="text" onChange={(event) => this.handlePrice(object, event)} placeholder={object.price}/>
                        </td>
                        {this.getSaveButton(object)}
                    </tr>
                )
            }
            return (
                <tr className="td">
                    <td className="td">{object.item}</td>
                    <td className="td">{object.quantity}</td>
                    <td className="td">{object.price}</td>
                </tr>
            );
        })
    }
    render() {


        return (
            <table className="table">
                <tr className="td">
                    <th className="th">ITEM</th>
                    <th className="th">QUANTITY</th>
                    <th className="th">PRICE ($)</th>
                </tr>
                {this.getList()}
            </table>
        )
    }
}
