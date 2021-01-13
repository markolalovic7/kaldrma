import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { signInWithGoogle } from "./base";
import { useDispatch, useSelector } from "react-redux";
import { SignInUser } from "./redux/user/user.actions"

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
})

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInSuccess } = useSelector(mapState);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      history.push('/');
    }
  }, [signInSuccess, history])

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(SignInUser({ email, password }));
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