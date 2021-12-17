import { Link } from 'react-router-dom';
import Cart from '../cart/Cart';
import logo from './logo.png';
import './header.scss';

function Header() {
    return (
        <header className="relative">
            <Link to="/">
                <figure>
                    <img src={logo ? logo : ''} className="logo" alt="Kaldrma" />
                    <figcaption>KaldrmaShop</figcaption>
                </figure>
            </Link>
            <Cart />
        </header>
    );
}

export default Header;
