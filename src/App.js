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
          kaldrma
      </header>
        <main>
          <section>
            {console.log(products)}
            {products && products.map((product) => (
              <Product key={product.id} details={product} />
            ))}
          </section>
        </main>
      </div>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path={`/:name`} component={Single}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
