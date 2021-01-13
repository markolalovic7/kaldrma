import React, { useState, useEffect } from 'react';
import './App.scss';
import base, { handleUserProfile } from "./base"
import Single from './Single';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';
import Registration from './Registration';
import LogIn from './LogIn';
import { auth } from "./base"
import { setCurrentUser } from "./redux/user/user.actions"
import { useDispatch } from "react-redux"


function App(props) {

  const [products, setProducts] = useState(null);
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      console.log("Success loading data :)", data);
      setProducts(data)
    }).catch(error => {
      console.log("Loading data error :/");
    })


    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }))
        })
      }
      dispatch(setCurrentUser(userAuth));
      setUser(userAuth);
    });

    return () => {
      authListener();
    };


  }, [dispatch]);


  // addItem(newItem) {
  //   this.setState({
  //     items: items.concat([newItem]) //updates Firebase and the local state
  //   });
  // }

  console.log("currentUser", user)
  return (
    <div className="App" >
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home products={products} />
          </Route>
          <Route path="/product/:productName" component={Single} />
          <Route path="/shopping-cart">
            <ShoppingCart />
          </Route>
          <Route path="/registration" render={() => user ? <Redirect to="/" /> : <Registration />} />
          <Route path="/log-in" render={() => user ? <Redirect to="/" /> : <LogIn />} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
