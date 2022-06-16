import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

function Header(){
    const {authenticatedUser} = useContext(Context)
    return(
        <div className="header">
            <div>
                <h1>Courses</h1>
                <nav>
                    {authenticatedUser ? 
                    <>
                        <span>Welcome, {authenticatedUser.firstName}!</span>
                        <Link to="/signout">Sign Out</Link>
                    </>
                    :
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/signin">Sign In</Link>
                    </>}
                </nav>
            </div>
        </div>
    )
}

export default Header;