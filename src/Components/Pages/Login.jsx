import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import ForgotPasswordForm from "../Forms/ForgotPasswordForm";

const Login = ({ setIsLoggedIn }) => {
    const [activeForm, setActiveForm] = useState("login");
    const navigate = useNavigate();  // <-- Initialize navigate hook

    const showForm = (formName) => setActiveForm(formName);

    return (
        <div className="bg-slate-100 p-6 rounded-2xl shadow-lg flex gap-8 items-center h-screen">
            <div className="w-[30%] mx-auto h-full overflow-auto">
                <h2 className="text-4xl font-bold mb-2 text-emerald-700">
                    {activeForm === "login" && "Welcome Back!"}
                    {activeForm === "register" && "Create an Account"}
                    {activeForm === "forgotPassword" && "Reset Password"}
                </h2>
                <p className="text-lg font-light mb-10">
                    {activeForm === "login" && "Hey there! Just log in to get back to where you left off."}
                    {activeForm === "register" && "Welcome! Please fill in the details to create your account."}
                    {activeForm === "forgotPassword" && "Enter your email to reset your password."}
                </p>

                {/* Pass setIsLoggedIn and navigate to LoginForm */}
                {activeForm === "login" && (
                    <LoginForm
                        onRegisterClick={() => showForm("register")}
                        onForgotClick={() => showForm("forgotPassword")}
                        setIsLoggedIn={setIsLoggedIn}  // Pass setIsLoggedIn to LoginForm
                        navigate={navigate}  // <-- Pass navigate to LoginForm
                    />
                )}
                {activeForm === "register" && <RegisterForm onLoginClick={() => showForm("login")} />}
                {activeForm === "forgotPassword" && <ForgotPasswordForm onBackToLogin={() => showForm("login")} />}
            </div>

            <div className="h-full w-[45%] rounded-lg overflow-hidden shadow-lg shadow-black/40">
                <img
                    src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="An image of books in a library"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
};

export default Login;
