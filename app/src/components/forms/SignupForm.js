import React, {Component} from "react";
import {Form, Button} from "semantic-ui-react";

class SignupForm extends Component{
    state = {
        data: {},
        loading: false,
        errors: {}
    }
    render(){
        return(
            <Form>
                <Button primary>Create Account</Button>
            </Form>
        );
    }
}

export default SignupForm;