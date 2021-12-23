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
import ShoppingCartList from './shared/components/shopping-cart/ShoppingCartList';
import Cart from './shared/components/cart/Cart';

function App() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const url = ProductsUrlEnum.PRODUCT_URL;
    const [shoppingCartVisible, setShoppingCartVisible] = React.useState<boolean>(false);
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

    function handleShoppingCartVisible() {
        setShoppingCartVisible(!shoppingCartVisible);
        if (shoppingCartVisible) {
            document.body.classList.remove('isHidden');
        } else {
            document.body.classList.add('isHidden');
        }
    }

    console.log('products', products);

    return (
        <CartProvider>
            <div className="App">
                <ShoppingCartList shoppingCartVisible={shoppingCartVisible} />
                <Cart handleShoppingCartVisible={handleShoppingCartVisible} shoppingCartVisible={shoppingCartVisible} />
                <Header />
                <Routes>
                    <React.Fragment>
                        <Route path={MainRoutes.HOME} element={<ProductList products={products} />}></Route>
                        <Route path={MainRoutes.SINGLE_PRODUCT} element={<SingleProduct />}></Route>
                    </React.Fragment>
                </Routes>
                <Footer />
            </div>
        </CartProvider>
    );
}

export default App;
