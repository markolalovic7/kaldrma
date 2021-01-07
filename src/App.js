import { useEffect, useState } from 'react';
import './App.scss';
import base from "./base"
import Product from './Product';
import Single from './Single';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Home from './Home';


function App() {
  const [products, setProducts] = useState(null);

  function getSales() {
    base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      console.log("Success loading data :)");
      setProducts(data)
    }).catch(error => {
      console.log("Loading data error :/");
    })
  }

  useEffect(() => {
    getSales();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1><Link to="/">kald<span>R</span>ma</Link></h1>
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <Home products={products} />
            </Route>
            <Route path="/:productName" component={Single} />

          </Switch>
        </main>
        <footer>
          <Link to="/">
            <img alt="footer logo" src="/footer-logo.png" />
            <span>KALDRMA</span>
          </Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
