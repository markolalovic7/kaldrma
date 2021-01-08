import React from "react";
import {
  Link
} from "react-router-dom";
import { auth } from "./base";

function Header(props) {
  const { currentUser } = props;
  return (
    <div className="header-wrap">
      <div className="top-nav">
        {!currentUser && (
          <>
            <Link to="/registration" >Register</Link>
            <Link to="/log-in" >Login</Link>
          </>
        )}
        {currentUser && (
          <>
            <Link to="#" disabled>{currentUser.displayName}</Link>
            <Link to="#" onClick={() => auth.signOut()}>Logout</Link>
          </>
        )}
        <Link to="/shopping-cart" className="flex-center relative" title="Go to cart">
          <i className="gg-shopping-cart"></i>
          {/* <span>Shopping cart</span> */}
          <span className="absolute">1</span>
        </Link>
      </div>
      <header className="App-header">
        <h1><Link to="/">kald<span>R</span>ma</Link></h1>
      </header>
    </div>
  )
}

Header.defaultProps = {
  currentUser: null
};

export default Header;