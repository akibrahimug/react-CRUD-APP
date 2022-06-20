import React, {useContext} from 'react';
import {Context} from '../Context';
import {Navigate, Outlet} from 'react-router-dom';

function Authorised(){
    const {authenticatedUser} = useContext(Context);

    return(
        authenticatedUser ? <Outlet /> : <Navigate to = '/signin' />
    )
}

export default Authorised;