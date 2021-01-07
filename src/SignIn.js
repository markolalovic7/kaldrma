import React, { Component } from "react";
import { signInWithGoogle } from "./base";

class SignIn extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="sign-in">
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="socialSignIn">

          </div>
          <button onClick={signInWithGoogle}><i className="gg-google"></i> Sign in with Google</button>
        </form>
      </div>
    )
  }

}

export default SignIn;