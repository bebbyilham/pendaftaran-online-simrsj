import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const NurseRoute = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = localStorage.getItem("SIDEPRESI:token");
  console.log(rest);
  localStorage.removeItem("SIDEPRESI:redirect");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? (
          <Component {...props} />
        ) : path === "/joined/:class" ? (
          <Redirect to={`/login?path=${location.pathname}`} />
        ) : (
          <Redirect to={`/private?path=${location.pathname}`} />
        )
      }
    />
  );
};

export default withRouter(NurseRoute);
