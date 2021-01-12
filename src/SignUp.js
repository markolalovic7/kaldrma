import React, { useState } from "react"
import { auth, handleUserProfile } from "./base"

function SignUp() {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      const err = ['Passwords do not match!']
      setErrors(err)
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await handleUserProfile(user, { displayName });

      resetForm();

    } catch (err) {
      //console.log(err);
    }

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