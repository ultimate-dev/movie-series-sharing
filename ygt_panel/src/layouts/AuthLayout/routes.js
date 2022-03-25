import React from "react";
import { Redirect, Route, Switch } from "react-router";
//Pages
const LoginPage = React.lazy(() => import("../../pages/auth/Login/LoginPage"));
//Roots
const ErrorPage = React.lazy(() =>
  import("../../pages/roots/errors/ErrorPage")
);

export default function Routes() {
  const suffix = "/auth";
  return (
    <Switch>
      {/**Routes */}
      <Route
        path={suffix + "/login"}
        render={(props) => <LoginPage {...props} />}
        exact
      />
      {/**Redirects */}
      <Redirect from={suffix + "/"} to={suffix + "/login"} exact />
      {/**Roots */}
      <Route
        path={suffix + "/*"}
        render={(props) => (
          <ErrorPage
            code="404"
            label="Sayfa Bulunamadı"
            desc="Aradığınız Sayfaya Ulaşamıyoruz."
            {...props}
          />
        )}
        exact
      />
    </Switch>
  );
}
