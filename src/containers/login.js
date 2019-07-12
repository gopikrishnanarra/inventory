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
            userExists: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
            passwordMissMatch: "",
            userExists: ""
        });
    };

    handleSubmit = event => {
        const userExists = this.props.data.users.find((user) => {
            return user.userId === this.state.email
        });
        if (userExists) {
            const passwordMatched = this.props.data.users.find((user) => {
                if(user.userId === this.state.email)
                return user.password === this.state.password
            });
            if (passwordMatched) {
                this.props.login();
            }
            if (!passwordMatched) {
                this.setState({
                    passwordMissMatch: true
                })
            }
        }
        if (!userExists) {
            this.setState({
                userExists: false
            })
        }
        event.preventDefault();
    };

    render() {
            return (
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
                            <Form.Group controlId="email" bsSize="large">
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="password" bsSize="large">
                                <Form.Control
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </Form.Group>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Login
                            </Button>
                        </Form>
                    </div>
                </section>
            );
    }
}
