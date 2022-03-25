import React from "react";
import { Redirect, Route, Switch } from "react-router";
//Layouts
const AuthLayout = React.lazy(() => import("../layouts/AuthLayout"));
const PanelLayout = React.lazy(() => import("../layouts/PanelLayout"));
//Roots
const ErrorPage = React.lazy(() => import("../pages/roots/errors/ErrorPage"));

export default function Routes() {
  return (
    <Switch>
      {/**Routes */}
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/panel" render={(props) => <PanelLayout {...props} />} />
      {/**Redirects */}
      <Redirect from="/" to="/auth" exact />
      {/**Roots */}
      <Route
        path="*"
        render={(props) => (
          <ErrorPage
            code="404"
            label="Sayfa Bulunamadı"
            desc="Aradığınız Sayfaya Ulaşamıyoruz."
            {...props}
          />
        )}
      />
    </Switch>
  );
}
