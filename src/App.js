import { useEffect, useState } from 'react';
import './App.scss';
import base, { handleUserProfile } from "./base"
import Single from './Single';
import {
  BrowserRouter as Router,
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

function App() {
  const [products, setProducts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);



  function getSales() {
    base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      console.log("Success loading data :)");
      setProducts(data)
    }).catch(error => {
      console.log("Loading data error :/");
    })
  }

  useEffect(() => {
    getSales();
    //let authListener = null;
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser(
            {
              id: snapshot.id,
              ...snapshot.data()
            }

          )
        })
      }
      setCurrentUser(null);
    })
  }, []);

  return (
    <Router>
      <div className="App">
        <Header currentUser={currentUser} />

        <main>
          <Switch>
            <Route path="/" exact>
              <Home products={products} />
            </Route>
            <Route path="/product/:productName" component={Single} />
            <Route path="/shopping-cart">
              <ShoppingCart />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/log-in" render={() => currentUser ? <Redirect to="/" /> : <LogIn />} />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
