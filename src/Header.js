import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function Header() {

  return (
    <div className="header-wrap">
      <div className="top-nav">
        <Link to="/shopping-cart" className="flex-center relative" title="Go to cart">
          <i class="gg-shopping-cart"></i>
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

export default Header;