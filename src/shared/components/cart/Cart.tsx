import { useContext } from 'react';
import { BiCartAlt } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';
import { CartContext } from '../../../CartContext';
import './cart.scss';

interface Props {
    handleShoppingCartVisible: () => void;
    shoppingCartVisible: boolean;
}

function Cart({ handleShoppingCartVisible, shoppingCartVisible }: Props) {
    const [cart] = useContext(CartContext);
    // console.log('cart', cart);
    return (
        <>
            <div className="cart fixed" onClick={handleShoppingCartVisible}>
                <div className="relative">
                    {!shoppingCartVisible && cart.length > 0 && <span className="absolute">{cart.length}</span>}
                    {!shoppingCartVisible ? <BiCartAlt color="#333" /> : <RiCloseLine color="#333" />}
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
