import React from 'react';
import '../App.css'
import axios from "axios";

export default class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            userExists: false,
            userAdded: true
        };
        this.setUser = this.setUser.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.addUser = this.addUser.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    cancel() {
        this.setState({
            user: "",
            userExists: false,
            password: "",
        });
        this.props.addNewUser(false);
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    setUser(event) {
        if(event.target.value.length) {
            const found = this.props.data.users.find((user)=>{
                return user.userId === event.target.value
            });
            if(found) {
                this.setState({
                    userExists: true
                })
            }
            if(!found) {
                this.setState({
                    userExists: false
                })
            }
            this.setState({
                user: event.target.value
            });
        }
    }
    async addNewUser() {
        if(!this.state.userExists) {
            const addUserUrl = `https://apiserverdata.com/users/create`;
            try {
                const response = await axios.post(addUserUrl, {
                    userId: this.state.user,
                    password: this.state.password
                });
                this.setState({
                    userAdded: response.data.userAdded
                });
                this.props.addNewUser(false)
            } catch (e) {
                console.log(e.error.message)
            }
        }
    }

    async addUser() {
        const found = this.props.data.users.find((user)=>{
            return user.userId === this.state.user
        });
        if(found) {
            this.setState({
                userExists: true
            })
        }
        if(!found) {
            this.setState({
                userExists: false
            });
            await this.addNewUser();
        }
    }

    render() {
        function addUserDisabled() {
            return this.state.userExists === true || !this.state.user.length || !this.state.password.length;
        }

        return (
            <div>
                <section className="centered">
                    <div className="centered">
                        <h3 className="info">Please enter userId</h3>
                        {!this.state.userAdded &&
                        <h3 className="error">Unable to add user</h3>
                        }
                        {this.state.userExists &&
                        <h3 className="error">user name already taken</h3>
                        }
                        <input placeholder="userId" className="input" onChange={this.setUser}/>
                        <h3 className="info">Please enter password</h3>
                        <input placeholder="password" className="input" onChange={this.setPassword}/>
                        <button className="button" disabled={addUserDisabled.call(this)} onClick={this.addUser}>Add User</button>
                        <button className="button" onClick={this.cancel}>Cancel</button>

                    </div>
                </section>
            </div>
        );
    }
}


