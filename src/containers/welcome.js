/* eslint-disable */
import React, { Component } from "react";

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
                <span>
                <button className="button" onClick={()=>this.props.welcomePage(false)}>
                    login
                </button>
                <button className="button" onClick={() => this.props.addNewUser(true)}>Create</button>
                </span>
            </section>
        );
    }
}
