// ================ Login and Registration modal ==================
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsCloudCheck } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";

function Login() {
  const { currentUser } = useContext(AuthContext);
  // =================== JSX ================
  return (
    <div className="login-div">
      {currentUser ? (
        <div className="inner-login-div" title={currentUser.email}>
          <div className="name-display">
            <h3>{currentUser.displayName}</h3>
            <div id="load" className="loaded">
              <BsCloudCheck className="load-icon" />
            </div>
            <div>
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="profile" />
              ) : (
                <CgProfile />
              )}
            </div>
          </div>
          <p style={{ margin: "0" }}>{currentUser.email}</p>
          <Button
            style={{ background: "white", color: "grey", fontSize: "18px" }}
            variant="success"
            onClick={() => {
              signOut(auth);
            }}
          >
            Logout <FiLogOut />
          </Button>
        </div>
      ) : (
        <Button
          style={{ background: "white", color: "grey", fontSize: "18px" }}
          variant="success"
          onClick={() => {
            signInWithPopup(auth, provider);
          }}
          title="SignIn to save data on cloud."
        >
          <FcGoogle /> SignIn with Google
        </Button>
      )}
    </div>
  );
}

export default Login;
