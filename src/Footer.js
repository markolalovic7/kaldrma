import React from "react";
import {
  Link
} from "react-router-dom";

function Footer() {

  return (
    <footer>
      <Link to="/">
        <img alt="footer logo" src="/footer-logo.png" />
        <span>KALDRMA</span>
      </Link>
      <small>© Kaldrma 2021</small>
    </footer>
  )
}

export default Footer;