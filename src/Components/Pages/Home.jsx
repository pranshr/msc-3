import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

/* ---- Widget Data ---- */
const widgets = [
  { name: "Weather", icon: "🌤" },
  { name: "Password Generator", icon: "🔑" },
  { name: "To-Do", icon: "✅" },
  { name: "Unit Converter", icon: "⚖️" },
  { name: "Notes", icon: "📝" },
  { name: "URL Shortener", icon: "🔗" },
];

/* --- Recently Used Example --- */
const recent = [
  { name: "To-Do", icon: "✅" },
  { name: "Weather", icon: "🌤" },
];

const quotes = [
  "Keep pushing forward!",
  "You got this, student!",
  "Every day is a chance to learn.",
  "Small steps, big results.",
];

const Home = ({ userName = "Alex" }) => {
  const navigate = useNavigate();  // <-- Initialize useNavigate hook
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleWidgetClick = (widgetName) => {
    // Use the widget name to navigate to the corresponding route
    switch (widgetName) {
      case "Weather":
        navigate("/weather");
        break;
      case "Password Generator":
        navigate("/password-generator");
        break;
      case "To-Do":
        navigate("/todo");
        break;
      case "Unit Converter":
        navigate("/unit-converter");
        break;
      case "Notes":
        navigate("/notes");
        break;
      case "URL Shortener":
        navigate("/url-shortener");
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            Welcome back, {userName}!
          </h1>
          <p className="mt-1 text-slate-600">{randomQuote}</p>
        </div>

        {/* Recently Used */}
        <section>
          <h2 className="text-lg font-medium text-slate-800 mb-3">
            Recently Used
          </h2>
          <div className="flex gap-4 overflow-x-auto">
            {recent.map((widget, index) => (
              <div
                key={index}
                className="flex-none bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:scale-105 transform transition cursor-pointer"
                onClick={() => handleWidgetClick(widget.name)} // <-- Handle widget click
              >
                <span className="text-2xl">{widget.icon}</span>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  {widget.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* All Widgets */}
        <section>
          <h2 className="text-lg font-medium text-slate-800 mb-3">
            All Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {widgets.map((widget, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:scale-105 transform transition cursor-pointer"
                onClick={() => handleWidgetClick(widget.name)} // <-- Handle widget click
              >
                <span className="text-3xl">{widget.icon}</span>
                <p className="mt-3 text-sm font-medium text-slate-800">
                  {widget.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
