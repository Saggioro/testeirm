import React from "react";
import { Route as ReactDOMRoute, Redirect } from "react-router-dom";

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  let user = false;
  const initialState = {
    email: "Cordel@email.com",
    senha: "123",
  };
  if (
    localStorage.getItem("@IRM/email") === initialState.email &&
    localStorage.getItem("@IRM/senha") === initialState.senha
  ) {
    user = true;
  } else {
    user = false;
  }
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export default Route;
