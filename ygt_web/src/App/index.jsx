import React, { useState, useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { message } from "antd";
//AOS
import AOS from "aos";
import "aos/dist/aos.css";
//Store
import store from "../redux/store";
//Routes
import Routes from "./routes";
//Components
import { DarkLoading, LightLoading } from "../components/Loading";
//Moment
import "moment/locale/tr";
import "moment/locale/en-gb";
import moment from "moment";
//
import I18n, { default_language } from "../locale";

export default function App() {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    if (!isOnline) {
      message.error("İnternet bağlantısı yok");
    }
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  });

  //AOS
  useEffect(() => {
    AOS.init({
      offset: 80,
      duration: 1000,
      once: true,
      easing: "ease",
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    let localStorageLang = localStorage.getItem("locale");
    if (localStorageLang) {
      I18n.locale = localStorageLang;
      moment.locale(localStorageLang);
      document.documentElement.lang = localStorageLang;
    } else {
      localStorage.setItem("locale", default_language);
      moment.locale(default_language);
      document.documentElement.lang = default_language;
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<DarkLoading />}>
          <LightLoading />
          <Routes />
        </Suspense>
      </Provider>
    </>
  );
}
