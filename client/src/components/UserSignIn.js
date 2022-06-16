// Renders a "Sign In" page for existing users
// Renders a "Sign In" button
// Renders a "Cancel" button that redirects to '/'


import React, {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from './Form'
import {Context} from '../Context'

function UserSignIn(){
    const {user, setUser} = useState({emailAddress: '', password: ''})
    const {errors, setErrors} = useState([])
    const {signIn} = useContext(Context)
    const navigate = useNavigate()
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser(user => ({...user, [name]: value}))
    }

    const submit = () => {
        const {emailAddress, password} = user
        signIn(emailAddress, password).then((user) => {
            if(user === null){
                setErrors(['Invalid password or Email'])
            }else{
                navigate('/')
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
        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <Form
                cancel = {cancel}
                errors = {errors}
                submit = {submit}
                submitButtonText = "Sign In"
                elements={() => (
                    <>
                        <input
                        id = "emailAddress"
                        name = "emailAddress"
                        type = "email"
                        value = {user.emailAddress}
                        onChange = {change}
                        placeholder = "Email Address" />
                        
                        <input
                        id = 'password'
                        name = 'password'
                        type = 'password'
                        value = {user.password}
                        onChange = {change}
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

export default UserSignIn;