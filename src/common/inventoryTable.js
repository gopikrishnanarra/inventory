import React from 'react';

import '../App.css'

function getList() {
    return this.props.list.map((object) => {
        if(this.props.props.data.editEnabled) {
            return (
                <tr className="td">
                    <td className="td">
                        <input type="text" onChange={this.handleItem}/>
                    </td>
                    <td className="td">
                        <input type="text" onChange={this.handleQuantity}/>
                    </td>
                    <td className="td">
                        <input type="text" onChange={this.handlePrice}/>
                    </td>
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

export default class InventoryTable extends React.Component {
constructor(props) {
    super(props);

    this.handleItem = this.handleItem.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

}

    handleItem(event) {
        console.log(event.target.value)
    }
    handleQuantity(event) {
        console.log(event.target.value)

    }
    handlePrice(event) {
        console.log(event.target.value)

    }

    render() {
        return (
            <table className="table">
                <tr className="td">
                    <th className="th">ITEM</th>
                    <th className="th">QUANTITY</th>
                    <th className="th">PRICE ($)</th>
                </tr>
                {getList.call(this)}
            </table>
        )
    }
}
