import { useContext } from 'react';
// import { BiCartAlt } from 'react-icons/bi';
import { CartContext } from '../../../CartContext';
import './shopping-cart-list.scss';

interface Props {
    shoppingCartVisible?: boolean;
}

function ShoppingCartList({ shoppingCartVisible }: Props) {
    const [cart] = useContext(CartContext);
    return shoppingCartVisible ? (
        <div className="shopping-cart-list">
            <div className="shopping-cart-inner">
                <h2>Shopping cart</h2>
                {cart.map((c: any, i: number) => {
                    return (
                        <div key={i}>
                            <h4>{c.name}</h4>
                            <div>
                                <p>
                                    Price: <code>{c.price} $</code>
                                </p>
                                <button>Remove item</button>
                            </div>
                            <hr className="style1" />
                        </div>
                    );
                })}
                <hr className="style2" />
                <h3>
                    Total:{' '}
                    <code>
                        {cart.reduce((accumulator: any, current: any) => accumulator + current.price, 0).toFixed(2)}$
                    </code>
                </h3>
                {cart.length === 0 ? <span>Shopping cart is empty!</span> : null}
                <button>Checkout</button>
            </div>
        </div>
    ) : null;
}

export default ShoppingCartList;
