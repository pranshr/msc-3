import { useState } from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom"; // Add useNavigate

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const correctEmail = 'test@email.com';
  const correctPassword = 'password';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === correctEmail) {
      setEmailError(false);
      if (password === correctPassword) {
        setPasswordError(false);
        console.log("Correct email and password");

        // Update the login state
        setIsLoggedIn("JohnDoe"); // Assuming username is "JohnDoe"

        // Navigate to home after login
        navigate("/"); // Navigate to the home page after successful login
      } else {
        setPasswordError(true);
      }
    } else {
      setEmailError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        errorMessage="No user with that email"
        required={true}
      />

      <InputField
        marginTop={6}
        marginBottom={10}
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        error={passwordError}
        errorMessage="Wrong Password!"
      >
        <a className="text-emerald-800 hover:underline flex-1 text-right cursor-pointer">
          Forgot Password ?
        </a>
      </InputField>

      <Button type="submit" marginTop={6}>
        Login
      </Button>
    </form>
  );
};

export default Login;
