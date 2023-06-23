import React from "react";
import { authService } from "../fBase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const handleonSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="github" onClick={handleonSocialClick}>
          Continue with Github
        </button>
        <button name="google" onClick={handleonSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
