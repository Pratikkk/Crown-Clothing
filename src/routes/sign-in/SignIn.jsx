import { Fragment } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils.js";

import SignUp from "../../components/sign-up/sign-up.jsx";

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const { userDocRef } = await createUserDocumentFromAuth(user);
  };

  return (
    <Fragment>
      <h1>Sign In Page</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google Popup</button>
      <SignUp key={Math.random()} />
    </Fragment>
  );
};
export default SignIn;
