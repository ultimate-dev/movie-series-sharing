import React, { useEffect } from "react";
import Routes from "./routes";
//Actions
import { removeUser } from "../../redux/actions";

function AuthLayout() {
  function onLogout() {
    localStorage.removeItem("userToken");
    removeUser();
  }

  useEffect(() => {
    onLogout();
  }, []);

  return (
    <div className="w-100">
      <Routes />
    </div>
  );
}
export default AuthLayout;
