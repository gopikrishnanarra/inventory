import React from 'react';

import AddInventory from './addInventory'
import InventoryTable from './common/inventoryTable'
import Login from '../src/containers/login'
import ResetPassword from '../src/containers/resetPassword'
import AddUser from '../src/containers/addUser'
import './App.css'
import axios from "axios";

function fetchInventory() {
    fetch("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
        .then(res => res.json())
        .then(list => {
            this.props.getInventory(list);
        });
}
function fetchUsers() {
    fetch("https://api.mlab.com/api/1/databases/users/collections/users-list?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
        .then(res => res.json())
        .then(users => {
            this.props.getUsers(users);
        });
}

function getAddUserButton() {
    if (this.props.data.user.admin === true) {
        return (
            <button className="nav-button" onClick={() => this.props.addNewUser(true)}>Add User</button>
        )
    }
}

function getClassName() {
    if (this.props.data.user.admin === true) {
        return "nav-admin-section";
    }
    return "nav-section";

}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: false,
            filteredInventory:[]
        };
        this.handleFilter = this.handleFilter.bind(this);
    }
    componentDidMount() {
        fetchUsers.call(this);
        fetchInventory.call(this);
        fetch("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
            .then(res => res.json())
            .then(list => {
                this.props.getEditedInventory(list);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.getNewInventory) {
            fetchInventory.call(this);
        }
        if (this.props.data.canGetUsers) {
            fetchUsers.call(this);
        }
    }

    async saveEditInventory(id) {
        const list = this.props.data.editedInventory.filter(o => o._id.$oid === id);
        const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory/${id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
        try {
            await axios.put(url, list[0]);
            this.props.deleteInventoryId(id);
        } catch (e){
            console.log(e.error.message)
        }
    }
    handleFilter(event) {
        if(event.target.value.length) {
            const newList = this.props.data.inventory.filter(o=>o.item.toLowerCase().includes(event.target.value.toLowerCase()));
            this.setState({
                filtered: true,
                filteredInventory: newList
            });
        }
        if(!event.target.value.length) {
            this.setState({
                filtered: false
            });
        }
    }

    render() {
        if (!this.props.data.loggedIn && !this.props.data.forgot) {
            return (
                <Login {...this.props}/>
            )
        }
        if (this.props.data.forgot) {
            return (
                <ResetPassword {...this.props}/>
            )
        }
        if (this.props.data.addUser) {
            return (
                <AddUser {...this.props}/>
            )
        }
        return (
            <div>
                <nav className="nav-bar">

                    <span className={getClassName.call(this)}>
                        {getAddUserButton.call(this)}
                        <button className="nav-button" onClick={this.props.logout}>logout</button>
                    </span>
                </nav>
                <div className={this.props.data.addEnabled ? "split left" : "inventory"}>
                    <div className="centered">
                        <input className="search" placeholder="search for Item" onChange={this.handleFilter}/>
                        <InventoryTable
                            props={this.props}
                            list={this.props.data.inventory}
                            save={this.saveEditInventory}
                            deleteInventoryId={this.props.deleteInventoryId}
                            filteredInventory={this.state.filteredInventory}
                            filtered={this.state.filtered}
                        />
                        {!this.props.data.editEnabled &&
                        <section>
                            <div>
                                <button className="button" onClick={this.props.openAddInventory}>ADD INVENTORY</button>
                            </div>
                            <div>
                                <button className="button" onClick={this.props.openEditInventory}>EDIT INVENTORY
                                </button>
                            </div>
                        </section>
                        }
                        {this.props.data.editEnabled &&
                        <div>
                            <button className="button" onClick={this.props.closeEditInventory}>CLOSE</button>
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
