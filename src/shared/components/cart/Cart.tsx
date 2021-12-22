import { useContext } from 'react';
import { BiCartAlt } from 'react-icons/bi';
import { CartContext } from '../../../CartContext';
import './cart.scss';

interface Props {
    handleShoppingCartVisible: () => void;
}

function Cart({ handleShoppingCartVisible }: Props) {
    const [cart] = useContext(CartContext);
    console.log('cart', cart);
    return (
        <>
            <div className="cart fixed" onClick={handleShoppingCartVisible}>
                <div className="relative">
                    <BiCartAlt color="#333" />
                    <span className="absolute">{cart.length}</span>
                </div>
            </div>
            {/* <div className="shopping-cart">
                {cart.map((c: any, i: number) => {
                    return <h3 key={i}>{c.name}</h3>;
                })}
            </div> */}
        </>
    );
}

export default Cart;
