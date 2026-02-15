import { useState } from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

const RegisterForm = ({ onLoginClick }) => {
    const [name, setName] = useState("");
    const [college, setCollege] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const emails = ["test@email.com", "testuser1@email.com", "admin@email.com"];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        } else {
            setPasswordMatchError(false);
        }

        if (emails.includes(email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        console.log("Registration attempted with", { name, college, email, password });
    };

    return (
        <div className="px-2">
            <form onSubmit={handleSubmit} className="min-h-[400px]">
                {/* Name Field */}
                <InputField
                    label="Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />

                {/* College Field */}
                <InputField
                    label="College"
                    id="college"
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required={true}
                    marginTop={4}
                />

                {/* Email Field */}
                <InputField
                    label="Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    marginTop={4}
                    error={emailError}
                    errorMessage="This email is already in use"
                />

                {/* Password Field with larger gap */}
                <InputField
                    label="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    marginTop={8}  // increased gap from email
                />

                {/* Confirm Password Field */}
                <InputField
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                    marginTop={4}
                    marginBottom={6}
                    error={passwordMatchError}
                    errorMessage="Passwords do not match!"
                />

                <Button type="submit" marginTop={6}>Register</Button>

                <p
                    className="mt-4 mb-1 text-sm text-center text-emerald-800 cursor-pointer"
                    onClick={onLoginClick}
                >
                    Already have an account? Login here
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
