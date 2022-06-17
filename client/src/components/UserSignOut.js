import React, {useEffect, useContext} from "react";
import {Navigate} from "react-router-dom";
import {Context} from "../Context";

function UserSignOut() {
  const {signOut} = useContext(Context);
  useEffect(() => signOut());

  return (
    <Navigate to="/" />
  );
}

export default UserSignOut;