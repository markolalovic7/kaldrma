import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { ProductsUrlEnum } from './model/domain/interfaces/enums/ProductsUrlEnum';
import { Product } from './model/domain/interfaces/Product';
import { MainRoutes } from './model/domain/ui/routes/MainRoutes';
import { CartProvider } from './CartContext';
import ProductList from './shared/components/product-list/ProductList';
import SingleProduct from './pages/single-product/SingleProduct';
import Header from './shared/components/header/header';
import Footer from './shared/components/footer/Footer';
import Checkout from './pages/checkout/Checkout';
import { Helmet } from 'react-helmet';

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

    return (
        <CartProvider>
            <div className="App">
                <Helmet>
                    <title>Kaldrma</title>
                    <link rel="canonical" href="https://kaldrma.com/" />
                </Helmet>
                <Header />
                <Routes>
                    <React.Fragment>
                        <Route path={MainRoutes.HOME} element={<ProductList products={products} />}></Route>
                        <Route path={MainRoutes.SINGLE_PRODUCT} element={<SingleProduct />}></Route>
                    </React.Fragment>
                    <Route path={MainRoutes.CHECKOUT} element={<Checkout />}></Route>
                </Routes>
                <Footer />
            </div>
        </CartProvider>
    );
}

export default App;
