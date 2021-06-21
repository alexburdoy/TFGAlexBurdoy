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
    <div className="m-5 p-5">
      <h1 className="py-3 detailsTitle ">Sign up</h1>
      <form onSubmit={handleSignUp}>
      <div className="form-row ">
                    <div className="col-md-4 mb-12 my-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text borderRadius" id="inputGroupPrepend2">Email</span>
                            </div>
                            <input type="email" className="form-control borderRadius" id="email" name="email" required></input>
                        </div>
                    </div>
                    <div className="form-row px-1">
                        <div className="col-md-12 my-2 ">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text borderRadius" id="inputGroupPrepend2">Password</span>
                                </div>
                                <input type="password" className="form-control borderRadius" id="password" name="password" required></input>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-info" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);