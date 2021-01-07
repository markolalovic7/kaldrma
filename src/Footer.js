import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function Footer() {

  return (
    <footer>
      <Link to="/">
        <img alt="footer logo" src="/footer-logo.png" />
        <span>KALDRMA</span>
      </Link>
    </footer>
  )
}

export default Footer;