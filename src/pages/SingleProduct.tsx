import { useContext, useEffect, useState } from 'react';
import './single-product.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsUrlEnum } from '../model/domain/interfaces/enums/ProductsUrlEnum';
import { BiArrowBack } from 'react-icons/bi';
import { CartContext } from '../CartContext';

interface tShirt {
    name: string;
    price: number;
}

function SingleProduct() {
    const [product, setProduct] = useState<any>({});
    let navigate = useNavigate();
    const url = ProductsUrlEnum.PRODUCT_URL;
    let { id } = useParams();
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        loadProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    //console.table(product);

    type simpleType = tShirt[];

    function handleAddToCart() {
        const tShirt: tShirt = { name: product.title, price: product.price };
        console.log('tShirt', tShirt);
        setCart((prevState: simpleType) => [...prevState, tShirt]);
    }

    console.log('cart', cart);

    return (
        <>
            <section className="product">
                <figure>
                    <img src={product.image} alt={product.title} />
                </figure>
                <aside>
                    {/* <button onClick={() => navigate(-1)}> */}
                    <BiArrowBack onClick={() => navigate(-1)} size={'30px'} />
                    {/* </button> */}
                    <h1>{product.title}</h1>
                    <h3>
                        {product.price} <span>RSD</span>
                    </h3>
                    <b>{product.category}</b>
                    <p>{product.description}</p>
                    <div className="shop-buttons-wrapper">
                        <button className="primary" onClick={handleAddToCart}>
                            add to cart
                        </button>
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
