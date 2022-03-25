import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/tr"
//Routes
import Routes from "./routes";
//Components
import {
  LoadingSuspense,
  LoadingOperation,
  RouterScroll,
  DialogBoxs,
} from "../components";

function App() {
  useEffect(() => {
    moment.locale("tr");
  }, []);

  return (
    <RouterScroll>
      <React.Suspense fallback={<LoadingSuspense />}>
        <LoadingOperation />
        <Routes />
        <DialogBoxs />
      </React.Suspense>
    </RouterScroll>
  );
}

export default App;
