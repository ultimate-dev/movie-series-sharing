import React from "react";
import { Route, Switch, Redirect } from "react-router";
//
//Pages
import HomePage from "../../pages/main/HomePage";
import MyProfilePage from "../../pages/main/Account/MyProfilePage";
import UserProfilePage from "../../pages/main/User/UserProfilePage";
import SettingsPage from "../../pages/main/Settings";
import PrivacySettingsPage from "../../pages/main/Settings/PrivacySettingsPage";
import PasswordSettingsPage from "../../pages/main/Settings/PasswordSettingsPage";
import EmailSettingsPage from "../../pages/main/Settings/EmailSettingsPage";
import AccountSettingsPage from "../../pages/main/Settings/AccountSettingsPage";
import MessagesPage from "../../pages/main/Messages";
import MessagesDetailPage from "../../pages/main/Messages/MessagesDetail";
import SearchPage from "../../pages/main/Search";
import MovieDetailPage from "../../pages/main/Tmdb/MovieDetail";
import SeriesDetailPage from "../../pages/main/Tmdb/SeriesDetail";

export default function Routes() {
  const suffix = "/main";
  return (
    <Switch>
      <Route
        path={suffix + "/home"}
        render={(props) => <HomePage {...props} />}
        exact
      />

      <Route
        path={suffix + "/account"}
        render={(props) => <MyProfilePage {...props} />}
      />

      <Route
        path={suffix + "/u/:user_id"}
        render={(props) => <UserProfilePage {...props} />}
      />

      <Route
        path={suffix + "/settings"}
        render={(props) => <SettingsPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/settings/account"}
        render={(props) => <AccountSettingsPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/settings/email"}
        render={(props) => <EmailSettingsPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/settings/password"}
        render={(props) => <PasswordSettingsPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/settings/privacy"}
        render={(props) => <PrivacySettingsPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/messages"}
        render={(props) => <MessagesPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/messages/:user_id"}
        render={(props) => <MessagesDetailPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/search"}
        render={(props) => <SearchPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/movie/:movie_id"}
        render={(props) => <MovieDetailPage {...props} />}
        exact
      />

      <Route
        path={suffix + "/series/:series_id"}
        render={(props) => <SeriesDetailPage {...props} />}
        exact
      />

      <Redirect
        from={[suffix + "/", suffix + "/*"]}
        to={suffix + "/home"}
        exact
      />
    </Switch>
  );
}
