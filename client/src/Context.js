import React, { useState, useEffect } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext()

export const Provider = (props) => {
    const {authenticatedUser, setAuthenticatedUser} = useState(null);
    useEffect(() => {
        if(authenticatedUser){
            Cookies.set('userCookies', JSON.stringify(authenticatedUser), {expires: 1})
        }else{
            console.log('No authenticated User')
        }
    }, [authenticatedUser]);

    const data = new Data();

    const signIn = async(emailAddress, password) => {
        const user = await data.getUser(emailAddress, password);
        if(user !== null){
            user.password = password;
            setAuthenticatedUser(user)
        }
    }

    const signOut = () => {
        setAuthenticatedUser(null)
        Cookies.remove('authenticatedUser');
    }

    return(
        <Context.Provider value = {{signIn, signOut, data, authenticatedUser}}>
        {props.children}
        </Context.Provider>
    )
}