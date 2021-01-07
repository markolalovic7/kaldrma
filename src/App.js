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
import Header from './Header';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';


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
        <Header />

        <main>
          <Switch>
            <Route path="/" exact>
              <Home products={products} />
            </Route>
            <Route path="/product/:productName" component={Single} />
            <Route path="/shopping-cart">
              <ShoppingCart />
            </Route>
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
