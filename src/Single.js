import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import base from "./base"

function Single(props) {

  const [products, setProducts] = useState();
  const [items, setItems] = useState();
  const productId = props.match.params.productId;

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
    products && productId &&
      setItems(products.filter(product => product.id == productId))
  }, [products]);


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