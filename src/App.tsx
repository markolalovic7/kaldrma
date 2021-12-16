import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { ProductsUrlEnum } from './model/domain/interfaces/enums/ProductsUrlEnum';
import { Product } from './model/domain/interfaces/Product';
import { MainRoutes } from './model/domain/ui/routes/MainRoutes';
import SingleProduct from './pages/SingleProduct';
import ProductList from './shared/components/product-list/ProductList';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { CartProvider } from './CartContext';

function App() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const url = ProductsUrlEnum.PRODUCT_URL;
    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadProducts = () => {
        axios
            .get(url)
            .then(function (response) {
                // handle success
                setProducts(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    console.log('products', products);

    return (
        <CartProvider>
            <div className="App">
                <header className="App-header relative">
                    <Link to="/">
                        <figure>
                            <img src={logo ? logo : ''} className="App-logo" alt="Kaldrma" />
                            <figcaption>KaldrmaShop</figcaption>
                        </figure>
                        {/* <h1>KALDRMA</h1> */}
                    </Link>
                    {/* <img src={logo ? logo : ''} className="App-logo" alt="Kaldrma" /> */}
                    <Cart />
                </header>
                <Routes>
                    <React.Fragment>
                        <Route path={MainRoutes.HOME} element={<ProductList products={products} />}></Route>
                        <Route path="/:id" element={<SingleProduct />}></Route>
                        {/* <Navigate to="/" /> */}
                    </React.Fragment>
                </Routes>
                <footer>footer</footer>
            </div>
        </CartProvider>
    );
}

export default App;
