import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "./AuthenticationContext";
import { jwtDecode as jwt_decode } from "jwt-decode";

const RolesAuthentication = ({ children }) => {
  const {user} = useContext(AuthenticationContext);
  let decodedToken;
  const token = localStorage.getItem("authToken");
  if (typeof token === "string") {
    decodedToken = jwt_decode(token);
  }

  if (decodedToken && (decodedToken.role === 'User' || decodedToken.role === 'Admin') || (!user)) {
    return <Navigate to="*" replace />;
  } else {
    return children;
  }
};
export default RolesAuthentication;