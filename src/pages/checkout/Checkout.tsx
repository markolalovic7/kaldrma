import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { CartContext } from '../../CartContext';
import './checkout.scss';
import { CheckoutInfo } from '../../model/domain/interfaces/CheckoutInfo';
import { Helmet } from 'react-helmet';
//import { PersonalInfo } from '../../model/domain/interfaces/PersonalInfo';

function Checkout() {
    let navigate = useNavigate();
    const [cart, setCart] = useContext(CartContext);
    const [checkoutInfo, setCheckoutInfo] = useState<Array<CheckoutInfo>>([]);
    const [personalInfo, setPersonalInfo] = useState<any>({});

    function handleRemoveItem(id: number) {
        let newCart = cart.filter((c: any) => {
            return c.id !== id;
        });
        setCart(newCart);
    }

    function handleValue(e: any) {
        const value = e.target.value;
        setPersonalInfo({
            ...personalInfo,
            [e.target.name]: value,
        });
    }

    function handleCheckoutInfo(e: any) {
        e.preventDefault();
        setCheckoutInfo({
            ...checkoutInfo,
            ...personalInfo,
            cart,
        });
    }

    console.log('checkoutInfo', checkoutInfo);

    return (
        <>
            <Helmet>
                <title>Kaldrma | Checkout</title>
                <link rel="canonical" href={`https://kaldrma.com/checkout`} />
            </Helmet>
            <section className="checkout-info-wrapper">
                <div className="checkout-shopping-cart">
                    <div className="checkout-shopping-car">
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
                                {cart
                                    .reduce((accumulator: any, current: any) => accumulator + current.price, 0)
                                    .toFixed(2)}
                                $
                            </code>
                        </h3>
                    </div>
                </div>
                <div className="personal-info">
                    <div className="go-back" onClick={() => navigate(-1)}>
                        <BiArrowBack size={'30px'} />
                        <span> Go back</span>
                    </div>
                    <h1>Checkout</h1>
                    <h2>Personal information</h2>
                    <form onSubmit={(e) => handleCheckoutInfo(e)}>
                        <div className="flex-center">
                            <label htmlFor="firstName">
                                <p>First name:</p>
                                <input
                                    type="text"
                                    placeholder="Ipce"
                                    id="firstName"
                                    value={personalInfo?.firstName || ''}
                                    name="firstName"
                                    onChange={(e) => handleValue(e)}
                                />
                            </label>
                            <label htmlFor="lastName">
                                <p>Last name:</p>
                                <input
                                    type="text"
                                    placeholder="Ahmedovski"
                                    id="lastName"
                                    value={personalInfo?.lastName || ''}
                                    name="lastName"
                                    onChange={(e) => handleValue(e)}
                                />
                            </label>
                        </div>
                        <label htmlFor="email">
                            <p>E-mail:</p>
                            <input
                                type="email"
                                placeholder="ipcelegenda@gmail.com"
                                id="email"
                                value={personalInfo?.email || ''}
                                name="email"
                                onChange={(e) => handleValue(e)}
                            />
                        </label>

                        <label htmlFor="address">
                            <p>Full address:</p>
                            <input
                                type="text"
                                placeholder="Pogled Boska Buhe 2, Beograd"
                                id="address"
                                value={personalInfo?.address || ''}
                                name="address"
                                onChange={(e) => handleValue(e)}
                            />
                        </label>

                        <label htmlFor="phone">
                            <p>Phone:</p>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="061063064"
                                value={personalInfo?.phone || ''}
                                name="phone"
                                onChange={(e) => handleValue(e)}
                            />
                        </label>
                        <br />
                        <div>
                            <button disabled={personalInfo?.email ? false : true} type="submit">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
export default Checkout;
