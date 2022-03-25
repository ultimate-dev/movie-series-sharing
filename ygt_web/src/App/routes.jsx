import React from "react";

import { Redirect, Route, Switch } from "react-router";
//Layouts
const AuthLayout = React.lazy(() => import('../layouts/auth'));
const MainLayout = React.lazy(() => import('../layouts/main'));


export default function Routes() {
  
  return (
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/main" render={(props) => <MainLayout {...props} />} />
      <Redirect from="/*" to="/main" exact />
    </Switch>
  );
}
