import React, { Component } from "react"
import { auth, handleUserProfile } from "./base"

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      const err = ['Passwords do not match!']
      this.setState({
        errors: err
      })
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await handleUserProfile(user, { displayName });

      this.state({
        ...initialState
      })


    } catch (err) {
      //console.log(err);
    }

  }

  render() {
    return (
      <div className="sign-up">
        {this.state.errors.length > 0 && (
          <ul>
            {this.state.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="displayName">
            <input id="displayName" type="name" placeholder="Type name..." value={this.state.displayName} onChange={(e) => this.setState({ displayName: e.target.value })} />
          </label>
          <label htmlFor="email">
            <input id="email" type="email" placeholder="Type email..." value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
          </label>
          <label htmlFor="password">
            <input id="password" type="password" placeholder="Type password..." value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          </label>
          <label htmlFor="confirmPassword">
            <input id="confirmPassword" type="password" placeholder="Confirm password..." value={this.state.confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
          </label>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }

}

export default SignUp;