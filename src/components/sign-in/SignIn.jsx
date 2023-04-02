import { useState, useContext } from "react";
import { FormInput } from "../form-input/FormInput";
import { Button, BUTTON_TYPE_CLASSES } from "../button/Button";
import { UserContext } from "../../contexts/UserContext.jsx";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase-utils.js";
import "./sign-in.scss";


const INITIAL_FORM_FIELDS = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(INITIAL_FORM_FIELDS);
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
      alert(`Failed to sign in with Google: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthWithEmailAndPassword (
        email,
        password
      );
      resetFormFields();
      setCurrentUser(user)
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert(`incorrect password for ${email}`);
          break;
        case "case/user-not-found":
          alert(`no user associated with this ${email}`);
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            label="Sign in with Google"
            type={BUTTON_TYPE_CLASSES.google}
            buttonType="google"
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
