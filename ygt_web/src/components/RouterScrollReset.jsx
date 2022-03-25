import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function RouterScroll({ children, location }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
}

export default withRouter(RouterScroll);