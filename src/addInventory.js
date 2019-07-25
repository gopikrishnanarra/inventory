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
            price: "",
            dollars: "",
            cents: "",
            invalidCents: false,
            inventory: {},
            saveEnabled: false,
            addBlocked: false,
            required: {
                item: true,
                quantity: true,
                dollars: true,
                cents: true
            },
            isRequired: false
        };

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleDollarsChange = this.handleDollarsChange.bind(this);
        this.handleCentsChange = this.handleCentsChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.saveInventory = this.saveInventory.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.saveEnabled === true && this.props.data.previewList.length === 0) {
            this.setState({
                saveEnabled: false
            })
        }
    }

    handleItemChange(event) {
        if(event.target.value.length > 0) {
            const itemDuplicated = this.props.data.inventory.find((o)=>{
                return o.item  === event.target.value;
            });
            if (itemDuplicated) {
                this.props.duplicatedItem(true);
            } else {
                this.props.duplicatedItem(false);
                this.setState({
                    item: event.target.value,
                    addBlocked: false,
                    required: {
                        ...this.state.required,
                        item: false
                    }
                });
            }

        } else {
            this.setState({
                required: {
                    ...this.state.required,
                    item: true
                }
            })
        }
    }
    handleQuantityChange(event) {
        if(event.target.value.length > 0) {
            this.setState({
                quantity: event.target.value,
                required: {
                    ...this.state.required,
                    quantity: false
                }
            });
        } else {
            this.setState({
                required: {
                    ...this.state.required,
                    quantity: true
                }
            })
        }
    }
    handleDollarsChange(event) {
        if(event.target.value.length > 0) {
            this.setState({
                dollars: event.target.value,
                required: {
                    ...this.state.required,
                    dollars: false
                }
            });
        } else {
            this.setState({
                required: {
                    ...this.state.required,
                    dollars: true
                }
            })
        }
    }
    handleCentsChange(event) {
        if(event.target.value.length > 0) {
            if (event.target.value.length < 3) {
                this.setState({
                    invalidCents: false,
                    cents: event.target.value,
                    required: {
                        ...this.state.required,
                        cents: false
                    }
                });
            } else {
                this.setState({
                    invalidCents: true,
                    required: {
                        ...this.state.required,
                        cents: false
                    }
                });
            }
        } else {
            this.setState({
                required: {
                    ...this.state.required,
                    cents: true
                }
            })
        }
    }

    handleAdd(event) {
        const { item, quantity, dollars, cents } = this.state.required;
        if(item || quantity || dollars || cents) {
            this.setState({
                isRequired: true
            })
        }
        else {
            this.setState({
                isRequired: false
            });
            const itemExists = this.props.data.previewList.find((o) => {
                return o.item === this.state.item;
            });
            if (!itemExists && this.state.item.length) {
                this.props.previewAddList([
                    {
                        item: this.state.item,
                        quantity: this.state.quantity,
                        price: this.state.dollars + '.' + this.state.cents
                    }
                ]);
                this.setState({
                    saveEnabled: true,
                    item: "",
                    quantity: "",
                    dollars: "",
                    cents: "",
                    required: {
                        item: true,
                        quantity: true,
                        dollars: true,
                        cents: true
                    },
                    isRequired: false
                });
                event.target.reset();
            }

            if (itemExists) {
                this.setState({
                    addBlocked: true
                })
            }
        }
        event.preventDefault();
    }

    reset() {
        this.props.resetPreview();
        this.props.duplicatedItem(false);
        this.setState({
            item: '',
            quantity: '',
            price: "",
            dollars: "",
            cents: "",
            invalidCents: false,
            inventory: {},
            saveEnabled: false,
            addBlocked: false,
        });
    }
    async saveInventory() {
            await this.save();
    }

    async save() {
            const url = 'https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
            await axios.post(url, this.props.data.previewList);
            this.reset();
            this.props.fetchInventory();
    }

    render() {
        return (
            <div>
                <section className="centered">
                    <form onSubmit={this.handleAdd}>
                        <label>
                            <div>Item:</div>
                            <input type="text" onChange={(e)=>this.handleItemChange(e)}/>
                        </label>
                        {this.props.data.itemDuplicated &&
                        <div className="warning">
                            this item already exists in the Inventory
                        </div>
                        }
                        <label>
                            <div>Quantity:</div>
                            <input type="number" onChange={this.handleQuantityChange.bind(this)}/>
                        </label>
                        <label>
                            <div>Price$:</div>
                            {this.state.invalidCents &&
                                <div className="error">max cents allowed 2 digits</div>
                            }
                            <span>
                            <input type="number" placeholder="$" className="price" onChange={this.handleDollarsChange.bind(this)}/>
                            <span>.</span>
                            <input type="number" placeholder="cents" className="price" onChange={this.handleCentsChange.bind(this)}/>
                            </span>
                        </label>
                        {this.state.isRequired &&
                            <div className="error">All fields are required</div>
                        }
                        <button className="button" disabled={this.props.data.itemDuplicated === true} type="submit">Add To Preview</button>
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
                    list={this.props.data.previewList}
                    canDelete={true}
                    />
                    <button className="button" onClick={this.reset}>reset</button>
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
