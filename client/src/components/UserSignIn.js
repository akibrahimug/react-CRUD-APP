// Renders a "Sign In" page for existing users
// Renders a "Sign In" button
// Renders a "Cancel" button that redirects to '/'


import React, {Component} from "react";
import {Link} from "react-router-dom";
import Form from './Form'

export default class UserSignIn extends Component{
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {emailAddress, password, errors} = this.state;
        
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <Form
                    cancel = {this.cancel}
                    errors = {errors}
                    submit = {this.submit}
                    submitButtonText = "Sign In"
                    elements={() => (
                        <>
                            <input
                            id = "emailAddress"
                            name = "emailAddress"
                            type = "email"
                            value = {emailAddress}
                            onChange = {this.change}
                            placeholder = "Email Address" />
                            
                            <input
                            id = 'password'
                            name = 'password'
                            type = 'password'
                            value = {password}
                            onChange = {this.change}
                            placeholder = 'Password' />
                        </>
                    )} />
                    <p>
                        Don't have a user account? <Link to="/signup">Sign Up</Link>
                    </p>
                    </div>
            </div>
        )
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => {
            return {
                [name]: value,
            }
        })
    }

    submit = () => {
        const {context} = this.props;
        const {emailAddress, password} = this.state;
        if(!emailAddress){
            this.setState(() => {
                return {
                    errors: [
                        'Email Address is required.'
                    ]
                }
            })
        }else{
            this.setState({
                emailAddress: emailAddress
            })

        }
        if(!password){
            this.setState(() => {
                return {
                    errors: [
                        'Password is required.'
                    ]
                }
            })
        }else{
            this.setState({
                password: password
            })
        }
        context.actions.signIn(emailAddress, password)
        .then(User => {
            if(User === null){
                this.setState(() => {
                    return {
                        errors: ['Invalid email or password']
                    }
                })
            }else{
                this.props.history.push('/');
                console.log('User signed in');
            }
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/error');
        })
    }

    cancel = () => {
        this.props.history.push('/');
    }
}
