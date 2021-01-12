import React, { useState } from "react";
import { signInWithGoogle, auth } from "./base";

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      //console.log(err);
    }
  }
  return (
    <div className="sign-in">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input name="email" type="email" value={email} placeholder="Type email..."
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <input name="password" type="password" value={password} placeholder="Type password..."
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log in</button>
        <div className="socialSignIn">
          <button className="flex-center" onClick={signInWithGoogle}><i className="gg-google"></i> Sign in with Google</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn;