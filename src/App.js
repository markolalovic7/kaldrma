import React, { useState, useEffect } from 'react';
import './App.scss';
import base, { handleUserProfile } from "./base"
import Product from './Product';
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
import { connect } from "react-redux"


function App(props) {

  const [products, setProducts] = useState(null);
  const { setCurrentUser, currentUser } = props;

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
          // this.setState({
          //   currentUserState: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // })
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };


  }, []);


  // addItem(newItem) {
  //   this.setState({
  //     items: items.concat([newItem]) //updates Firebase and the local state
  //   });
  // }

  // componentWillUnmount() {
  //   this.authListener();
  // }



  return (
    <div className="App" >
      <Header
      //currentUserState={currentUserState} 
      />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home products={products} />
          </Route>
          <Route path="/product/:productName" component={Single} />
          <Route path="/shopping-cart">
            <ShoppingCart />
          </Route>
          <Route path="/registration" render={() => currentUser ? <Redirect to="/" /> : <Registration />} />
          <Route path="/log-in" render={() => currentUser ? <Redirect to="/" /> : <LogIn />} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
