import React, {Component} from "react";
import {Form, Button} from "semantic-ui-react";
import Validator from "validator";
import InLineError from "../messages/InLineError";
import PropTypes from "prop-types";

class LoginForm extends Component{
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange = e => this.setState({data:{...this.state.data, [e.target.name]: e.target.value}});

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    };

    validate = (data) => {
        const errors = {};
        if(!Validator.isEmail(data.email)) errors.email = "invalid email";
        if(!data.password || !data.confirm_password) errors.password = "password field can't be blank";
        return errors;
    };

    render(){
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!this.state.errors.email}>
                    <label htmlFor="email">email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address here"
                        value={this.state.data.email}
                        onChange={this.onChange}
                    />
                    {this.state.errors.email && <InLineError text={this.state.errors.email}/>}
                </Form.Field>
                <Form.Field error={!!this.state.errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password here"
                        value={this.state.data.password}
                        onChange={this.onChange}
                    />
                    {this.state.errors.password && <InLineError text={this.state.errors.password}/>}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;