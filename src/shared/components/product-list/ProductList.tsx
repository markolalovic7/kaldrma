import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../model/domain/interfaces/Product';
import Cart from '../cart/Cart';
import ShoppingCartList from '../shopping-cart/ShoppingCartList';
import './product-list.scss';

interface ProductListProps {
    products: any;
}

function ProductList({ products }: ProductListProps) {
    let navigate = useNavigate();
    const [shoppingCartVisible, setShoppingCartVisible] = React.useState<boolean>(false);

    function handleShoppingCartVisible() {
        setShoppingCartVisible(!shoppingCartVisible);
        if (shoppingCartVisible) {
            document.body.classList.remove('isHidden');
        } else {
            document.body.classList.add('isHidden');
        }
    }

    return (
        <>
            <ShoppingCartList shoppingCartVisible={shoppingCartVisible} />
            <Cart handleShoppingCartVisible={handleShoppingCartVisible} shoppingCartVisible={shoppingCartVisible} />
            <section className="product-list">
                {products.map((product: Product) => {
                    return (
                        <article key={product.id}>
                            <div className="article-inner">
                                <div onClick={() => navigate(`/${product.id}`)}>
                                    <figure>
                                        <img src={product.image} alt={product.title} />
                                    </figure>
                                    <h2>{product.title}</h2>
                                </div>
                                <b>{product.category}</b>
                                <p>
                                    {product.price} <span>RSD</span>
                                </p>
                                {/* <details>{product.description}</details> */}
                            </div>
                        </article>
                    );
                })}
            </section>
        </>
    );
}

export default ProductList;
