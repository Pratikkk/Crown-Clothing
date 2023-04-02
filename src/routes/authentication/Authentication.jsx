import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils.js";

import SignUp from "../../components/sign-up/sign-up.jsx";
import SignIn from "../../components/sign-in/SignIn.jsx";
import "./authentication.scss";
const Authentication = () => {
  const handleGoogleSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const { userDocRef } = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="authentication-container">
      <SignIn key={Math.random()}></SignIn>
      <SignUp key={Math.random()} />
    </div>
  );
};
export default Authentication;
