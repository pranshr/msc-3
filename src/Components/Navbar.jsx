import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import DropdownMenu from "./UI/DropdownMenu";
import UserDropdown from "./UI/UserDropdown";

const Navbar = ({ isLoggedIn, username, setIsLoggedIn, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Apply dark mode class to document.documentElement for global theme support
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Add this to track the current page
  const currentPageValue = location.pathname === "/"
    ? "" // Home page
    : location.pathname.slice(1); // Remove leading '/' to get the value


  const pages = [
    { label: "Weather", value: "weather" },
    { label: "Password Generator", value: "password-generator" },
    { label: "To Do", value: "todo" },
    { label: "Unit Converter", value: "unit-converter" },
    { label: "Notes", value: "notes" },
    { label: "URL Shortener", value: "url-shortener" },
    { label: "Home", value: "" },
  ];

  const userOptions = isLoggedIn
    ? [
      { label: "Dashboard", value: "dashboard" },
      { label: "Logout", value: "logout" },
    ]
    : [{ label: "Login", value: "login" }];

  const onPageChange = (page) => {
    if (page === "") {
      navigate("/"); // Home (root page)
    } else {
      navigate(`/${page}`);
    }
  };

  const onUserOptionSelect = (option) => {
    if (option.value === "login") {
      navigate("/login");
    } else if (option.value === "logout") {
      setIsLoggedIn(false); // Logout
      console.log("User logged out");
      navigate("/"); // Navigate to Home after logout
    } else if (option.value === "dashboard") {
      navigate("/dashboard"); // Navigate to Dashboard
    }
  };

  return (
    <div className="h-screen w-screen bg-emerald-950 p-3 pb-0 flex flex-col transition-colors duration-300">
      <div className="bg-white rounded-md overflow-hidden flex-1 border border-emerald-800/50">
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>

      <nav className="py-2 flex justify-between items-center text-static-white">
        <div className="flex items-center">
          <button
            className="text-3xl font-bold px-4 bg-emerald-500 hover:bg-emerald-400 text-static-white rounded-md flex items-center justify-center h-12 transition-colors"
            onClick={() => navigate("/")}>
            J
          </button>

          <DropdownMenu
            options={pages}
            onChange={onPageChange}
            openUp={true}
            label="Home"
            bgColor="bg-emerald-800 hover:bg-emerald-700"
            textColor="text-static-white"
            textSize="text-base"
            buttonHeight="h-12"
            currentValue={currentPageValue}
            className="w-56 mx-3"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 text-static-white transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center w-12 h-12"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <i className="fa-solid fa-sun text-xl"></i>
            ) : (
              <i className="fa-solid fa-moon text-xl"></i>
            )}
          </button>

          <UserDropdown
            options={userOptions}
            onSelect={onUserOptionSelect}
            username={username}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
