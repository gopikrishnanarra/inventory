/* eslint-disable */
import React, { Component } from "react";
import Login from './login'
import App from '../../src/App'
import ResetPassword from "./resetPassword";
import AddUser from "./addUser";


export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordMissMatch: "",
            userExists: "",
            user: {}
        };
    }

    render() {
        return (
            <section className="centered">
                        <div className="welcome">
                            WELCOME
                        </div>
                        <div className="header">
                            Manage Your Inventory
                        </div>
                        <div className="header">
                            please login to your account
                        </div>
                <button className="button" onClick={()=>this.props.welcomePage(false)}>
                    login
                </button>
                    </section>
        );
    }
}
