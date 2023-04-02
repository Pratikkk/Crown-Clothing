import { useState,useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./sign-up.scss";
import { Button } from "../button/Button.jsx";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils";
import { FormInput } from "../form-input/FormInput.jsx";

const INITIAL_FORM_FIELDS = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { displayName, email, password, confirmPassword } = formFields;

  const {setCurrentUser} = useContext(UserContext)

  const resetFormFields = () => {
    setFormFields((prev) => ({ ...prev, ...INITIAL_FORM_FIELDS }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords does not match !");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert(`Cannot create user, ${email} is already in use`);
          break;
        default:
          console.log(" user creation encountered an error", error);
          break;
      }
    }
  };
  // SignUp.propTypes = {
  //   displayName: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  //   confirmPassword: PropTypes.string.isRequired,
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="sign-up-container">
      <h2>Dont' have an account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Name"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          type="email"
          label="Email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          autoComplete="email"
        />
        <FormInput
          type="password"
          label="Password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          autoComplete="new-password"
        />
        <FormInput
          type="password"
          label="Confirm Password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
