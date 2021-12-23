import { useContext, useEffect, useState } from 'react';
import './single-product.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { CartContext } from '../../CartContext';
import { ProductsUrlEnum } from '../../model/domain/interfaces/enums/ProductsUrlEnum';
import { v4 as uuid } from 'uuid';

interface tShirt {
    id: any;
    name: string;
    price: number;
    size?: string;
}

function SingleProduct() {
    const [product, setProduct] = useState<any>({});
    let navigate = useNavigate();
    const url = ProductsUrlEnum.PRODUCT_URL;
    let { id } = useParams();
    const [cart, setCart] = useContext(CartContext);
    const [size, setSize] = useState<string>();
    const unique_id = uuid();

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

    function handleSize(e: any) {
        console.log('e', e.target.value);
        setSize(e.target.value);
    }

    type simpleType = tShirt[];

    function handleAddToCart(e: any) {
        e.preventDefault();
        const tShirt: tShirt = { id: unique_id, name: product.title, price: product.price, size: size };
        setCart((prevState: simpleType) => [...prevState, tShirt]);
    }

    console.log('cart', cart);

    return (
        <>
            {/* <div className="space">
                <div className="space-inner"></div>
            </div> */}
            <section className="product">
                <figure>
                    <img src={product.image} alt={product.title} />
                </figure>
                <aside>
                    {/* <button onClick={() => navigate(-1)}> */}
                    <div className="go-back" onClick={() => navigate(-1)}>
                        <BiArrowBack size={'30px'} />
                        <span> Back to products</span>
                    </div>
                    {/* </button> */}
                    <h1>{product.title}</h1>
                    <h3>
                        {product.price} <span>RSD</span>
                    </h3>
                    <b>{product.category}</b>
                    <p>{product.description}</p>
                    <form onSubmit={(e) => handleAddToCart(e)}>
                        <fieldset>
                            <legend>Choose a size?</legend>
                            <div>
                                <label htmlFor="xs">
                                    <input
                                        type="radio"
                                        id="xs"
                                        name="size"
                                        value="xs"
                                        onChange={(e) => handleSize(e)}
                                    />
                                    <code>
                                        <small>XS</small>
                                    </code>
                                </label>
                                <label htmlFor="s">
                                    <input type="radio" id="s" name="size" value="s" onChange={(e) => handleSize(e)} />
                                    <code>
                                        <small>S</small>
                                    </code>
                                </label>
                                <label htmlFor="m">
                                    <input type="radio" id="m" name="size" value="m" onChange={handleSize} />
                                    <code>
                                        <small>M</small>
                                    </code>
                                </label>
                            </div>
                        </fieldset>
                        <div className="shop-buttons-wrapper">
                            <button disabled={size ? false : true} className="primary" type="submit">
                                add to cart
                            </button>
                            {/* <button className="secondary">shop now</button> */}
                        </div>
                    </form>
                </aside>
            </section>
            <section>
                <details>---</details>
            </section>
        </>
    );
}

export default SingleProduct;
