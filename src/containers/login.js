/* eslint-disable */
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Login extends Component {
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

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handleReset() {
        this.props.forgot(true);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
            passwordMissMatch: "",
            userExists: ""
        });
    };

    handleSubmit = async event => {
        fetch(`https://apiserverdata.com/users/userDetails?id=${this.state.email}&password=${this.state.password}`)
            .then(res => res.json())
            .then(user => {
                    if(user.login) {
                        this.props.login(user);
                    }
                    this.setState({
                        passwordMissMatch: user.passwordMissMatch,
                        userExists: user.userExists
                    });
            });
        event.preventDefault();
    };

    render() {
            return (
                <div>
                <section className="centered">
                    {this.state.userExists === false &&
                    <div className="error">
                        user does not exists
                    </div>}
                    {this.state.passwordMissMatch === true &&
                    <div className="error">
                        user and password miss match
                    </div>}
                    <div className="Login">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="email" bssize="large">
                                <Form.Control
                                    placeholder="userId"
                                    className="input"
                                    autoFocus
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="password" bssize="large">
                                <Form.Control
                                    placeholder="password"
                                    className="input"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </Form.Group>
                            <Button
                                block
                                bssize="large"
                                className="button"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Login
                            </Button>
                            <Button className="button" onClick={()=>this.props.forgot(true)}>
                                reset
                            </Button>
                            <Button className="button" onClick={()=>this.props.welcomePage(true)}>
                                cancel
                            </Button>
                        </Form>
                    </div>
                </section>
                </div>
            );
    }
}
