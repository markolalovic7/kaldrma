import { Link } from 'react-router-dom';
//import logo from './kaldrma-logo.svg';
import './header.scss';
import KaldrmaLogo from '../../../assets/svg/KaldrmaLogo';

function Header() {
    return (
        <header className="relative">
            <Link to="/">
                <figure>
                    <KaldrmaLogo />
                    <figcaption>KaldrmaShop</figcaption>
                </figure>
            </Link>
        </header>
    );
}

export default Header;
