import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-100">
        <h1 className="text-6xl font-bold text-emerald-700 mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
        <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-emerald-700 text-white rounded-md hover:bg-emerald-800"
        >
        Go Home
        </button>
        </div>
    );
};

export default NotFound;
