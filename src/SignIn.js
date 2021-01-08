import React, { Component } from "react";
import { signInWithGoogle, auth } from "./base";

const initialState = {
  email: '',
  password: ''
}
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.state({
        ...initialState
      })
    } catch (err) {
      //console.log(err);
    }
  }

  render() {
    return (
      <div className="sign-in">
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            <input name="email" type="email" value={this.state.email} placeholder="Type email..." onChange={(e) => this.setState({ email: e.target.value })} />
          </label>
          <label htmlFor="password">
            <input name="password" type="password" value={this.state.password} placeholder="Type password..." onChange={(e) => this.setState({ password: e.target.value })} />
          </label>
          <button type="submit">Log in</button>
          <div className="socialSignIn">
            <button className="flex-center" onClick={signInWithGoogle}><i className="gg-google"></i> Sign in with Google</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;