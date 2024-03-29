import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { BiCartAlt } from 'react-icons/bi';
import { CartContext } from '../../../CartContext';
import { MainRoutes } from '../../../model/domain/ui/routes/MainRoutes';
import './shopping-cart-list.scss';

interface Props {
    shoppingCartVisible?: boolean;
}

function ShoppingCartList({ shoppingCartVisible }: Props) {
    let navigate = useNavigate();
    const [cart, setCart] = useContext(CartContext);
    function handleRemoveItem(id: number) {
        let newCart = cart.filter((c: any) => {
            return c.id !== id;
        });
        setCart(newCart);
    }

    function handleCheckout() {
        document.body.classList.remove('isHidden');
        navigate(`${MainRoutes.CHECKOUT}`);
    }

    return shoppingCartVisible ? (
        <div className="shopping-cart-list">
            <div className="shopping-cart-inner">
                <h2>Shopping cart</h2>
                {cart.map((c: any, i: number) => {
                    return (
                        <div key={i}>
                            <h4>{c.name}</h4>
                            <div>
                                <small>
                                    Size: <span>{c.size}</span>
                                </small>
                                <p>
                                    Price: <code>{c.price} $</code>
                                </p>

                                <button onClick={() => handleRemoveItem(c.id)}>Remove item</button>
                            </div>
                            <hr className="style1" />
                        </div>
                    );
                })}
                <hr className="style2" />

                {cart.length === 0 ? <span>Shopping cart is empty!</span> : null}
                <h3>
                    Total:{' '}
                    <code>
                        {cart.reduce((accumulator: any, current: any) => accumulator + current.price, 0).toFixed(2)}$
                    </code>
                </h3>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    ) : null;
}

export default ShoppingCartList;
