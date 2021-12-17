import { useContext } from 'react';
import { BiCartAlt } from 'react-icons/bi';
import { CartContext } from '../../../CartContext';
import './cart.scss';

function Cart() {
    const [cart] = useContext(CartContext);
    return (
        <div className="cart fixed">
            <div className="relative">
                <BiCartAlt color="#333" />
                <span className="absolute">{cart.length}</span>
            </div>
        </div>
    );
}

export default Cart;
