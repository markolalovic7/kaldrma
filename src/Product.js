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
        <img alt={name} src={image} />
        <Link to={`/${name.replace(/\s+/g, '-').toLowerCase()}`}>
          <h2>
            {name}
          </h2>
        </Link>
        <p>{desc}</p>
        <p>{price}</p>
        <p>{status}</p>
        <b>{category ? category : "-"}</b>

      </article>
    </>
  )
}

export default Product;