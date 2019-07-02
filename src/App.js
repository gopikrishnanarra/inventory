import React from 'react';

import './App.css'


function getList() {
    return this.state.list.map((object) => {
        return (
            <tr className="td">
                <td className="td">{object.item}</td>
                <td className="td">{object.quantity}</td>
                <td className="td">{object.price}</td>
            </tr>
        );
    })
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            quantity: '',
            price: '',
            list: [],
        };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
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

    render() {
        return (
            <section>
                <form onSubmit={this.handleAdd}>
                    <label>
                        Item:
                        <input type="text"  onChange={this.handleItemChange} />
                    </label>
                    <label>
                        Quantity:
                        <input type="text"  onChange={this.handleQuantityChange} />
                    </label>
                    <label>
                        Price$:
                        <input type="text"  onChange={this.handlePriceChange} />
                    </label>
                    <input type="submit" value="Add" />
                </form>
                <button onClick={this.reset}>reset</button>
                <table className="table">
                    <tr className="td">
                        <th className="th">ITEM</th>
                        <th className="th">QUANTITY</th>
                        <th className="th">PRICE ($)</th>
                    </tr>
                    {getList.call(this)}
                </table>
            </section>

        );
    }
}

export default App;
