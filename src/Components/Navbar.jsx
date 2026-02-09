import { useNavigate, useLocation, Outlet } from "react-router-dom";
import DropdownMenu from "./UI/DropdownMenu";
import UserDropdown from "./UI/UserDropdown";

const Navbar = ({ isLoggedIn, username, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="h-screen w-screen bg-slate-900 p-3 pb-0 flex flex-col">
      <div className="bg-white rounded-md overflow-hidden flex-1 border border-slate-400">
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>

      <nav className="py-2 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="text-3xl font-bold px-4 bg-neutral-300 rounded-md flex items-center justify-center h-12"
            onClick={() => navigate("/")}>
            J
          </button>

          <DropdownMenu
            options={pages}
            onChange={onPageChange}
            openUp={true}
            label="Home"
            bgColor="bg-gray-200 text-gray-900"
            textSize="text-base"
            buttonHeight="h-12"
            selectedValue={currentPageValue}  {/* <-- Pass selectedPage here */}
          />
        </div>

        <div className="flex items-center">
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
