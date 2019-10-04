import React from 'react';

import AddInventory from './addInventory'
import InventoryTable from './common/inventoryTable'
import Login from '../src/containers/login'
import ResetPassword from '../src/containers/resetPassword'
import Welcome from '../src/containers/welcome'
import AddUser from '../src/containers/addUser'
import './App.css'

function fetchInventory() {
    fetch("https://apiserverdata.com/inventory")
        .then(res => res.json())
        .then(list => {
            this.props.getInventory(list.filter(item => item.userId === this.props.data.user.userId));
        });
}
function fetchUsers() {
    fetch("https://api.mlab.com/api/1/databases/users/collections/users-list?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
        .then(res => res.json())
        .then(users => {
            this.props.getUsers(users);
        });
}

function getLogoutButton() {
    if(this.props.data.loggedIn === true) {
        return (
            <button className="nav-button" onClick={this.props.logout}>Logout</button>
        );
    }
}

function fetchEditedInventory() {
    fetch("https://apiserverdata.com/inventory")
        .then(res => res.json())
        .then(list => {
            this.props.getEditedInventory(list.filter(item => item.userId === this.props.data.user.userId));
        })
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: false,
        };
        this.handleFilter = this.handleFilter.bind(this);
    }
    componentDidMount() {
        fetchUsers.call(this);
        fetchInventory.call(this);
        fetchEditedInventory.call(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.getNewInventory || this.props.data.deleted || this.props.data.edited) {
            fetchInventory.call(this);
            fetchEditedInventory.call(this);
        }
        if (this.props.data.canGetUsers) {
            fetchUsers.call(this);
        }
    }

    handleFilter(event) {
        if(event.target.value.length) {
            const newList = this.props.data.inventory.filter(o=>o.item.toLowerCase().includes(event.target.value.toLowerCase()));
            this.setState({
                filtered: true,
                filteredInventory: newList
            });
            this.props.filteredList(newList);
        }
        if(!event.target.value.length) {
            this.setState({
                filtered: false
            });
            this.props.filteredList(this.props.data.inventory);
        }
    }

    getButtonClassName(isActive) {
        return isActive ? "side-button-active" : "side-button";
    }

    render() {
        return (
            <div>
                <nav className="nav-bar">
                   <h2 className="nav-header">
                       My Store Room
                   </h2>
                    <span className="nav-section">
                        {getLogoutButton.call(this)}
                    </span>
                </nav>
                <div className="inventory">
                    {this.props.data.welcome &&
                         <Welcome {...this.props}/>
                    }
                    {(!this.props.data.loggedIn && !this.props.data.forgot && this.props.data.getLoginPage) &&
                        <Login {...this.props}/>
                    }
                    {this.props.data.forgot &&
                        <ResetPassword {...this.props}/>
                    }
                    {this.props.data.addUser &&
                        <AddUser {...this.props}/>
                    }
                </div>
                {this.props.data.sidePanelOpen &&
                <div className="split left">
                    <div className="side-panel">
                        <section>
                            <div>
                                <button className={this.getButtonClassName(this.props.data.inventoryEnabled)} onClick={this.props.openInventory}>INVENTORY LIST
                                </button>
                            </div>
                            <div>
                                <button className={this.getButtonClassName(this.props.data.addEnabled)} onClick={this.props.openAddInventory}>ADD INVENTORY
                                </button>
                            </div>
                            <div>
                                <button className={this.getButtonClassName(this.props.data.editEnabled)} onClick={this.props.openEditInventory}>EDIT INVENTORY
                                </button>
                            </div>
                        </section>
                    </div>

                </div>
                }
                {!this.props.data.addEnabled && (this.props.data.inventoryEnabled || this.props.data.editEnabled) &&
                <div className="split right">
                    {this.props.data.editEnabled &&
                    <div className="headers">EDIT INVENTORY</div>
                    }
                    {this.props.data.inventoryEnabled &&
                    <div className="headers">INVENTORY LIST</div>
                    }
                    <div className="centered">
                        <input className="search" placeholder="search for Item" onChange={this.handleFilter}/>
                        <InventoryTable
                            props={this.props}
                            list={this.props.data.inventory}
                            save={this.saveEditInventory}
                            deleteInventoryId={this.props.deleteInventoryId}
                            filteredInventory={this.props.data.filteredInventory}
                            filtered={this.state.filtered}
                            canDelete={false}
                        />
                        {this.props.data.editEnabled &&
                        <div>
                            <button className="button" onClick={this.props.closeEditInventory}>CLOSE</button>
                        </div>
                        }
                    </div>
                </div>
                }
                {this.props.data.addEnabled &&
                <div className="split right">
                    <div className="headers">ADD INVENTORY</div>
                    <div className="centered">
                        <AddInventory {...this.props}/>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default App;
