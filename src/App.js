import React, { Component } from 'react';
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

const initialState = {
  products: null,
  currentUser: null,
  //currentUserState: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount() {
    base.fetch('products', {
      context: this,
      asArray: true
    }).then(data => {
      console.log("Success loading data :)", data);
      this.setState({ products: data })
    }).catch(error => {
      console.log("Loading data error :/");
    })

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUserState: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
          this.props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      this.setState({
        currentUserState: null
      });
      this.props.setCurrentUser(userAuth);
    });
  }

  // addItem(newItem) {
  //   this.setState({
  //     items: this.state.items.concat([newItem]) //updates Firebase and the local state
  //   });
  // }

  componentWillUnmount() {
    this.authListener();
  }

  render() {

    const { currentUser } = this.props;
    console.log("currentUserApp", currentUser);

    return (
      <div className="App" >
        <Header
        //currentUserState={this.state.currentUserState} 
        />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home products={this.state.products} />
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
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
