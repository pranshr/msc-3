import React, { useState } from "react";

/* ---- Mock Data ---- */
const user = { name: "Alex Johnson", icon: "👤" };

const initialPreferences = { city: "Boston", units: "Metric", theme: "Light" };

const widgets = [
  "Weather",
  "Password Generator",
  "To-Do",
  "Unit Converter",
  "Notes",
  "URL Shortener",
];

const usageStats = {
  mostUsed: { name: "To-Do", icon: "✅", time: "4h 30m" },
  tools: [
    { name: "Weather", icon: "🌤", time: 90 },
    { name: "Password Generator", icon: "🔑", time: 45 },
    { name: "To-Do", icon: "✅", time: 270 },
    { name: "Unit Converter", icon: "⚖️", time: 60 },
    { name: "Notes", icon: "📝", time: 80 },
    { name: "URL Shortener", icon: "🔗", time: 30 },
  ],
  weekly: [1, 2, 1.5, 2.5, 1, 3, 2],
};

const usageHistory = [
  { name: "To-Do", icon: "✅", time: "Feb 9, 8:32 PM" },
  { name: "Weather", icon: "🌤", time: "Feb 9, 7:50 PM" },
  { name: "Notes", icon: "📝", time: "Feb 8, 6:10 PM" },
  { name: "Unit Converter", icon: "⚖️", time: "Feb 8, 4:02 PM" },
];

const Dashboard = () => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempPrefs, setTempPrefs] = useState(preferences);

  const openModal = () => {
    setTempPrefs(preferences);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const savePreferences = () => {
    setPreferences(tempPrefs);
    closeModal();
  };

  return (
    <div className="h-full bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
              Your Dashboard
            </h1>
            <p className="mt-1 text-slate-600">
              A snapshot of how you use your tools
            </p>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
            <span className="text-2xl">{user.icon}</span>
            <span className="text-sm font-medium text-slate-800">
              {user.name}
            </span>
          </div>
        </div>

        {/* Preferences */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-800">Preferences</h2>
            <button
              onClick={openModal}
              className="text-sm font-medium text-slate-600 hover:text-slate-800 transition"
            >
              ✏️ Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm text-slate-500">Default City</p>
              <p className="mt-1 text-lg font-medium text-slate-800">
                {preferences.city}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm text-slate-500">Preferred Units</p>
              <p className="mt-1 text-lg font-medium text-slate-800">
                {preferences.units}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm text-slate-500">Theme</p>
              <p className="mt-1 text-lg font-medium text-slate-800">
                {preferences.theme}
              </p>
            </div>
          </div>
        </section>

        {/* Usage Overview */}
        <section>
          <h2 className="text-lg font-medium text-slate-800 mb-4">
            Usage Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-sm text-slate-500 mb-2">Most Used Tool</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{usageStats.mostUsed.icon}</span>
                <div>
                  <p className="text-lg font-medium text-slate-800">
                    {usageStats.mostUsed.name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {usageStats.mostUsed.time} total
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 md:col-span-2">
              <p className="text-sm text-slate-500 mb-4">Time Spent Per Tool</p>
              <div className="space-y-3">
                {usageStats.tools.map((tool, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm text-slate-700 mb-1">
                      <span>
                        {tool.icon} {tool.name}
                      </span>
                      <span>{tool.time} min</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-slate-700 h-2 rounded-full"
                        style={{
                          width: `${(tool.time / 300) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Usage */}
        <section>
          <h2 className="text-lg font-medium text-slate-800 mb-4">
            Weekly Usage
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-end gap-4 h-32">
              {usageStats.weekly.map((hours, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className="w-full bg-slate-700 rounded-md"
                    style={{ height: `${hours * 20}px` }}
                  />
                  <span className="mt-2 text-xs text-slate-500">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage History */}
        <section>
          <h2 className="text-lg font-medium text-slate-800 mb-4">
            Tool Usage History
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Tool</th>
                  <th className="text-left px-5 py-3 font-medium">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {usageHistory.map((entry, index) => (
                  <tr key={index} className="border-t border-slate-200">
                    <td className="px-5 py-4 text-slate-800">
                      {entry.icon} {entry.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Preferences Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-medium text-slate-800 mb-4">
              Edit Preferences
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Default City
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-lg p-2"
                  value={tempPrefs.city}
                  onChange={(e) =>
                    setTempPrefs({ ...tempPrefs, city: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Preferred Units
                </label>
                <select
                  className="w-full border border-slate-200 rounded-lg p-2"
                  value={tempPrefs.units}
                  onChange={(e) =>
                    setTempPrefs({ ...tempPrefs, units: e.target.value })
                  }
                >
                  <option value="Metric">Metric</option>
                  <option value="Imperial">Imperial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">Theme</label>
                <select
                  className="w-full border border-slate-200 rounded-lg p-2"
                  value={tempPrefs.theme}
                  onChange={(e) =>
                    setTempPrefs({ ...tempPrefs, theme: e.target.value })
                  }
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={savePreferences}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-800 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
