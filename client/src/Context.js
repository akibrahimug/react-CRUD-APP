import React, { useState, useEffect } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext()

export const Provider = (props) => {
    const [userCookies, setUserCookies] = useState(Cookies.get('userCookies'));
    const [authenticatedUser, setAuthenticatedUser] = useState(userCookies ? JSON.parse(userCookies) : null);

    // setup Cookies instance for authenticated user
    useEffect(() => {
        if(authenticatedUser){
            Cookies.set('userCookies', JSON.stringify(authenticatedUser), {expires: 1})
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
        Cookies.remove('userCookies');
    }

    return(
        <Context.Provider value = {{signIn, signOut, data, authenticatedUser}}>
        {props.children}
        </Context.Provider>
    )
}