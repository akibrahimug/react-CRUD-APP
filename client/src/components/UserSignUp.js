// Renders a "Sign Up" page for new users
/** 
 * Renders a "Sign Up" button that POST
 * to /api/users and signs in the user
 **/ 
// Renders a "Canel" button that redirects to '/'

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignUp extends Component{
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        errors: [],
    }

    render(){
        const {
            firstName, lastName, emailAddress, password, errors,
        } = this.state;
        const user = {
            firstName, lastName, emailAddress, password,
        }
        return (
            <div>
                <div>
                    <h1>Sign Up</h1>
                    <Form 
                    cancel = {this.cancel}
                    errors = {errors}
                    submit = {this.submit}
                    submitButtonText = "Sign Up"
                    elements = {() => (
                        <>
                            <input
                            id = "firstName"
                            name = "firstName"
                            type = "text"
                            value = {firstName}
                            onChange = {this.handleChange}
                            placeholder = "First Name" />

                            <input
                            id = "lastName"
                            name = "lastName"
                            type = "text"
                            value = {lastName}
                            onChange = {this.handleChange}
                            placeholder = "Last Name" />

                            <input
                            id = "emailAddress"
                            name = "emailAddress"
                            type = "email"
                            value = {emailAddress}
                            onChange = {this.handleChange}
                            placeholder = "Email Address" />
                            
                            <input
                            id = "password"
                            name = "password"
                            type = "password"
                            value = {password}
                            onChange = {this.handleChange}
                            placeholder = "Password" />
                            
                        </>
                    )} />
                    <p>
                        Already have an account? <Link to = "/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        )
    }

    handleChange = (e) => {
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
        const {firstName, lastName, emailAddress, password} = this.state;
        const user = { firstName, lastName, emailAddress, password };
        context.data.createUser(user)
        .then(errors => {
            if(errors.length){
                this.setState({errors});
            }else{
                console.log("User created");
            }
        })
        .catch(err => {
            this.props.history.push("/error");
        })
    }

    cancel = () => {
        this.props.history.push("/");
    }
}