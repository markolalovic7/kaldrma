import React from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


function Product(props) {
  const { id, name, image, desc, price, status, category } = props.details;

  return (
    <>
      <article>
        <Link to={`/product/${name.replace(/\s+/g, '-').toLowerCase()}`}>
          <img alt={name} src={`/images/${image}`} />
        </Link>
        <h2>
          <Link to={`/product/${name.replace(/\s+/g, '-').toLowerCase()}`}>
            {name}
          </Link>
        </h2>
        <p>{desc}</p>
        {/* <p>{price} din</p> */}
        {/* <p>{status}</p> */}
        {/* <b>{category ? category : "-"}</b> */}
        <button><i class="gg-math-plus"></i> <span>Add to cart <b>[{price} din]</b></span></button>
      </article>
    </>
  )
}

export default Product;