import React from "react";
import { Route, Switch, Redirect } from "react-router";
//Pages
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

export default function Routes() {
  const suffix = "/auth";

  return (
    <Switch>
      <Route path={suffix + "/login"} render={(props) => <LoginPage {...props} />} exact />
      <Route
        path={suffix + "/register"}
        render={(props) => <RegisterPage {...props}/>}
        exact
      />
      <Redirect
        from={[suffix + "/", suffix + "/*"]}
        to={suffix + "/login"}
        exact
      />
    </Switch>
  );
}
