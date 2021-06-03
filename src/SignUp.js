import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebaseAuth from "./firebase-config";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const url = `https://citmalumnes.upc.es/~alexbm1/TFG/data/addUser.php?email=${email.value}`;
      console.log(url);
    try {
      await firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);