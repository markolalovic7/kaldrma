import { useEffect, useState } from 'react';
import './App.css';
import base from "./base"

function App() {
  const [products, setProducts] = useState(null);

  function getSales() {
    base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      console.log("Success loading data");
      setProducts(data)
    }).catch(error => {
      console.log("Error loading data");
    })
  }

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        kaldrma
      </header>
      <body>
        {console.log("products:", products)}
      </body>
    </div>
  );
}

export default App;
