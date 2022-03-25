import React from "react";
import { Route, Switch, Redirect } from "react-router";
//
//Sections
import PostsSection from "./PostsSection";
import FollowedsSection from "./FollowedsSection";
import FollowersSection from "./FollowersSection";
import ListsSection from "./ListsSection";

export default function Routes({
  followeds = [],
  followers = [],
  posts = [],
  lists = {},
}) {
  let token = localStorage.getItem("userToken");
  const suffix = "/main/u/:user_id";
  return (
    <Switch>
      <Route
        path={[suffix + "/posts", suffix]}
        render={(props) => <PostsSection {...props} items={posts} />}
        exact
      />
      <Route
        path={suffix + "/followeds"}
        render={(props) => <FollowedsSection {...props} items={followeds} />}
        exact
      />
      <Route
        path={suffix + "/followers"}
        render={(props) => <FollowersSection {...props} items={followers} />}
        exact
      />
      <Route
        path={suffix + "/lists"}
        render={(props) => <ListsSection {...props} items={lists} />}
        exact
      />
    </Switch>
  );
}
