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

function App() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const url = ProductsUrlEnum.PRODUCT_URL;
    useEffect(() => {
        loadProducts();
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

    // console.table(products);

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">
                    <img src={logo ? logo : ''} className="App-logo" alt="Kaldrma" />
                    {/* <h1>KALDRMA</h1> */}
                </Link>
                {/* <img src={logo ? logo : ''} className="App-logo" alt="Kaldrma" /> */}
            </header>
            <Routes>
                <React.Fragment>
                    <Route path={MainRoutes.HOME} element={<ProductList products={products} />}></Route>
                    <Route path="/:id" element={<SingleProduct />}></Route>
                    {/* <Navigate to="/" /> */}
                </React.Fragment>
            </Routes>
            <footer>ovo je footer jbm li ti mooter</footer>
        </div>
    );
}

export default App;
