import React, { use } from "react";
import SignIn from "../components/SignIn";
import SingUp from "../components/SignUp";
import { AuthContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const SignPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="sign-page-container">
      {auth || isAuthenticated ? (
        <>
          <h3>You are already logged in!</h3>
          <h2>What would you like to do?</h2>
          <p className="link-text">
            <Link to="../events">
              Go to the Events Page to create, edit or look up events.
            </Link>
          </p>
        </>
      ) : (
        <>
          <h2>
            Already have an Account?
            <br />
            Then please SignIn!
          </h2>

          <SignIn />

          <h2>
            Don't have an Account?
            <br />
            Then please SignUp!
          </h2>

          <SingUp />
        </>
      )}
    </div>
  );
};

export default SignPage;
