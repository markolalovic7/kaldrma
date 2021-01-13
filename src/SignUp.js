import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SignUpUser } from "./redux/user/user.actions"

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { signUpSuccess, signUpError } = useSelector(mapState);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      history.push('/');
    }

    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError)
    }
  }, [signUpSuccess, signUpError, history])

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(SignUpUser({ displayName, email, password, confirmPassword }));
  }

  return (
    <div className="sign-up">
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return (
              <li key={index}>
                {err}
              </li>
            );
          })}
        </ul>
      )}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="displayName">
          <input id="displayName" type="name" placeholder="Type name..." value={displayName}
            onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label htmlFor="email">
          <input id="email" type="email" placeholder="Type email..." value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <input id="password" type="password" placeholder="Type password..." value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="confirmPassword">
          <input id="confirmPassword" type="password" placeholder="Confirm password..." value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )

}

export default SignUp;