import { useState } from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

const ForgotPasswordForm = ({ onBackToLogin }) => {
    const [resetEmail, setResetEmail] = useState("");

    const handleSubmitResetPassword = (e) => {
        e.preventDefault();
        console.log("Password reset requested for:", resetEmail);
        setResetEmail("");
    };

    return (
        <form onSubmit={handleSubmitResetPassword}>
            <InputField
                label="Email"
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required={true}
            />

            <Button type="submit" marginTop={6}>Reset Password</Button>
            <p className="text-sm text-center mt-4 text-emerald-800 cursor-pointer" onClick={onBackToLogin}>
                Remembered your password? Login here
            </p>
        </form>
    );
};

export default ForgotPasswordForm;
