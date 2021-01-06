import React from "react";
import Product from "./Product";

function Home(props) {
  let products = props.products;

  return (
    <section>
      {products && products.map((product) => (
        <Product key={product.id} details={product} />
      ))}
    </section>
  )
}

export default Home;