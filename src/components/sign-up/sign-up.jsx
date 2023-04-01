import { useState } from "react";
import PropTypes from "prop-types";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils";

const initialFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields((prev) => ({ ...prev, ...initialFormFields }));
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
      <h2>Dont' have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          autoComplete="email"
        />
        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          autoComplete="new-password"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
