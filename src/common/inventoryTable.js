import React from 'react';

import '../App.css'

export default class InventoryTable extends React.Component {
constructor(props) {
    super(props);
    this.state = {

    };
    this.handleItem = this.handleItem.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

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

    getSaveButton(obj) {
        if (this.props.props.data.inventoryIds.includes(obj._id.$oid)) {
            return (
                <td>
                <button onClick={()=> this.props.save(obj._id.$oid)}>save</button>
                </td>
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
