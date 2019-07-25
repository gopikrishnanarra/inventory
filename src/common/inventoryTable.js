import React from 'react';
import axios from "axios";

import '../App.css'

export default class InventoryTable extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        dollars: 0,
        cents: 0,
        invalidCents: false
    };
    this.handleItem = this.handleItem.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleDollar = this.handleDollar.bind(this);
    this.handleCents = this.handleCents.bind(this);
    this.saveEditInventory = this.saveEditInventory.bind(this);

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
    handleDollar(object, event) {
        this.addInventoryId(object);
        this.setState({
            dollars: event.target.value
        }, ()=>{
            this.props.props.editPrice(object._id.$oid, this.getPrice(object))
        });

    }
    handleCents(object, event) {
    if(event.target.value.length < 3) {
        this.addInventoryId(object);
        this.setState({
            invalidCents: false,
            cents: event.target.value
        }, () => {
            this.props.props.editPrice(object._id.$oid, this.getPrice(object))
        });
    } else {
        this.setState({
            invalidCents: true
        })
    }
    }

    getPrice({ price }) {
    console.log('this.state.dollars', this.state.dollars);
        const dollars = this.state.dollars !== 0  ? this.state.dollars : price.split('.')[0];
        const cents = this.state.cents !== 0  ? this.state.cents : price.split('.')[1];
        return dollars + '.' + cents;
    }

    async saveEditInventory(id) {
        const list = this.props.props.data.editedInventory.filter(o => o._id.$oid === id);
        const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory/${id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
        try {
            await axios.put(url, list[0]);
            this.props.props.editInventory();
            this.props.props.deleteInventoryId(id);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteInventory(id) {
        const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory/${id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
        try {
            await axios.delete(url);
            this.props.props.deleteInventory();
        } catch (e){
            console.log(e)
        }
    }

    getSaveButton(obj) {
        if (this.props.props.data.inventoryIds.includes(obj._id.$oid) && !this.state.invalidCents) {
            return (
                <td>
                <button className="button" onClick={()=> this.saveEditInventory(obj._id.$oid)}>save</button>
                </td>
            )
        }
        return null;
    }

    getList() {

    if(this.props.filtered) {
        if (this.props.filteredInventory.length > 0) {
            return this.getInventoryTable(this.props.filteredInventory)
        }
        return this.getInventoryTable([])
    }
        return this.getInventoryTable(this.props.list)
    }

    getInventoryTable(list) {
        return list.map((object) => {
            if (this.props.props.data.editEnabled) {
                return (
                    <tr className="td">
                        <td className="td">
                            <input type="text" onChange={(event) => this.handleItem(object, event)}
                                   placeholder={object.item}/>
                        </td>
                        <td className="td">
                            <input type="number" onChange={(event) => this.handleQuantity(object, event)}
                                   placeholder={object.quantity}/>
                        </td>
                        <td className="td">
                            <span>
                                <span>$</span>
                            <input type="number" className="price" onChange={(event) => this.handleDollar(object, event)}
                                   placeholder={object.price.split('.')[0]}/>
                                <span>.</span>
                           <input type="number" className="price" onChange={(event) => this.handleCents(object, event)}
                                   placeholder={`${object.price.split('.')[1]} cents`}/>
                                { this.state.invalidCents && this.props.props.data.inventoryIds.includes(object._id.$oid) &&
                                    <div className="error">max cents allowed 2 digits</div>
                                }
                            </span>
                        </td>
                        <td className="td">
                            <button className="delete-button" onClick={()=>this.deleteInventory(object._id.$oid)}>delete</button>
                        </td>
                        {this.getSaveButton(object)}
                    </tr>
                )
            }
            return (
                <tr key={object.item} className="td">
                    <td className="td">{object.item}</td>
                    <td className="td">{object.quantity}</td>
                    <td className="td">{object.price}</td>
                    { this.props.canDelete &&
                    <td className="td">
                    <button className="delete-button" onClick={()=>this.props.props.removeFromPreview(object)}>remove</button>
                    </td>
                    }

                </tr>
            );
        });
    }

    render() {
        return (
            <table className="table">
                <tbody>
                <tr className="td">
                    <th className="th">ITEM</th>
                    <th className="th">QUANTITY</th>
                    <th className="th">PRICE ($)</th>
                </tr>
                {this.getList()}
                </tbody>
            </table>
        )
    }
}
