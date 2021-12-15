import { useEffect, useState } from 'react';
import axios from 'axios';
import './single-product.scss';
import { useParams } from 'react-router-dom';
import { ProductsUrlEnum } from '../model/domain/interfaces/enums/ProductsUrlEnum';

function SingleProduct() {
    const [product, setProduct] = useState<any>({});
    const url = ProductsUrlEnum.PRODUCT_URL;
    let { id } = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = () => {
        axios
            .get(`${url}/${id}`)
            .then(function (response) {
                // handle success
                setProduct(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };
    console.table(product);
    return (
        <>
            <section className="product">
                <figure>
                    <img src={product.image} alt={product.title} />
                </figure>
                <aside>
                    <h1>{product.title}</h1>
                    <h3>
                        {product.price} <span>RSD</span>
                    </h3>
                    <b>{product.category}</b>
                    <p>{product.description}</p>
                    <div className="shop-buttons-wrapper">
                        <button className="primary">add to cart</button>
                        <button className="secondary">shop now</button>
                    </div>
                </aside>
            </section>
            <section>
                <details>nema</details>
            </section>
        </>
    );
}

export default SingleProduct;
