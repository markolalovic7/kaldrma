import React, { useEffect, useState } from "react";
import base from "./base"

function Single(props) {

  const [products, setProducts] = useState();
  const [items, setItems] = useState();
  const productName = props.match.params.productName;

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
    products && productName &&
      setItems(products.filter(product => product.name.replace(/\s+/g, '-').toLowerCase() === productName))
  }, [products && productName]);


  return (
    <div className="product-page">
      {items &&
        items.map((it) =>
          it.name
        )
      }
    </div>
  )
}

export default Single;