// Renders a "Sign Up" page for new users
/** 
 * Renders a "Sign Up" button that POST
 * to /api/users and signs in the user
 **/ 
// Renders a "Canel" button that redirects to '/'

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import {Context} from '../Context'

function UserSignUp(){
    const {data, signIn} = useContext(Context)
    const {user, setUser} = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
    })
    const {errors, setErrors} = useState([])
    const navigate = useNavigate();

    const change = (e) => {
        const {name, value} = e.target;
        setUser(user => ({...user, [name]: value}))
    }

     const submit = () => {
         data.createUser(user)
        .then(errors => {
            if(errors.length){
                setErrors(errors) 
            }else{
                signIn(user.emailAddress, user.password)
                .then(() => navigate('/'));
            }
        })
        .catch(err => {
            console.log(err);
            navigate('/error');
        })
    }

     const cancel = () => {
        navigate('/');
    }
    return (
        <div>
            <div>
                <h1>Sign Up</h1>
                <Form 
                cancel = {cancel}
                errors = {errors}
                submit = {submit}
                submitButtonText = "Sign Up"
                elements = {() => (
                    <>
                        <input
                        id = "firstName"
                        name = "firstName"
                        type = "text"
                        value = {user.firstName}
                        onChange = {change}
                        placeholder = "First Name" />

                        <input
                        id = "lastName"
                        name = "lastName"
                        type = "text"
                        value = {user.lastName}
                        onChange = {change}
                        placeholder = "Last Name" />

                        <input
                        id = "emailAddress"
                        name = "emailAddress"
                        type = "email"
                        value = {user.emailAddress}
                        onChange = {change}
                        placeholder = "Email Address" />
                        
                        <input
                        id = "password"
                        name = "password"
                        type = "password"
                        value = {user.password}
                        onChange = {change}
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

export default UserSignUp;