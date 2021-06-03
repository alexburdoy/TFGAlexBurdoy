import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebaseAuth from "./firebase-config";
import { AuthContext } from "./Auth.js";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;

            try {
                await firebaseAuth
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="m-5 p-5">
            <h1 className="py-3 detailsTitle ">Log in</h1>
            <form onSubmit={handleLogin}>
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
                <button className="btn btn-info" type="submit">Log in</button>
            </form>
            <Link to="/signup">
                <a>
                    <p className="email">Crea un compte</p>
                </a>
            </Link>

        </div>
    );
};

export default withRouter(Login);