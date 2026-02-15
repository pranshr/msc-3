import React, { useState, useEffect } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState({
    totalGenerated: 0,
    avgLength: 0,
    useUppercase: 0,
    useNumbers: 0,
    useSymbols: 0,
  });
  const [generatedHashes, setGeneratedHashes] = useState(new Set());
  const [strength, setStrength] = useState({ score: 0, label: "Weak", color: "red" });

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem("pwStats") || "{}");
    if (savedStats.totalGenerated) setStats(savedStats);
  }, []);

  useEffect(() => {
    localStorage.setItem("pwStats", JSON.stringify(stats));
  }, [stats]);

  // Password strength calculation
  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    let label = "Weak";
    if (score >= 4) label = "Strong";
    else if (score >= 2) label = "Medium";

    // Interpolate color: red → yellow → green
    let color;
    if (score <= 2) {
      const t = score / 2;
      const r = Math.round(245 + (250 - 245) * t);
      const g = Math.round(113 + (204 - 113) * t);
      const b = Math.round(113 + (21 - 113) * t);
      color = `rgb(${r},${g},${b})`;
    } else {
      const t = (score - 2) / 3;
      const r = Math.round(250 + (52 - 250) * t);
      const g = Math.round(204 + (211 - 204) * t);
      const b = Math.round(21 + (153 - 21) * t);
      color = `rgb(${r},${g},${b})`;
    }

    return { score, label, color };
  };

  // Generate password
  const generatePassword = async () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

    let chars = lowercase;
    if (useUppercase) chars += uppercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    let newPassword = "";
    let hash;

    do {
      newPassword = "";
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        newPassword += chars[index];
      }

      const buffer = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(newPassword)
      );
      hash = Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } while (generatedHashes.has(hash));

    setGeneratedHashes((prev) => new Set(prev).add(hash));
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));

    // Update stats
    setStats((prev) => {
      const total = prev.totalGenerated + 1;
      return {
        totalGenerated: total,
        avgLength: ((prev.avgLength * prev.totalGenerated + newPassword.length) / total).toFixed(2),
        useUppercase: prev.useUppercase + (useUppercase ? 1 : 0),
        useNumbers: prev.useNumbers + (useNumbers ? 1 : 0),
        useSymbols: prev.useSymbols + (useSymbols ? 1 : 0),
      };
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="h-full bg-gray-100 p-4 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">

        {/* Password Generator Card */}
        <div className="bg-white p-8 rounded-lg shadow-md flex-1">
          <h1 className="text-2xl font-bold mb-6 text-center">Password Generator</h1>

          {/* Options */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Password Length:</label>
            <input
              type="number"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={() => setUseUppercase(!useUppercase)}
              />
              <span>Include Uppercase Letters</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers(!useNumbers)}
              />
              <span>Include Numbers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
              />
              <span>Include Symbols</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
          >
            Generate Password
          </button>

          {password && (
            <div className="mb-4">
              <input
                type="text"
                readOnly
                value={password}
                className="w-full p-2 border rounded focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                Copy to Clipboard
              </button>

              {/* Password Strength */}
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
                  <div
                    className="h-2 rounded transition-all duration-500"
                    style={{
                      width: `${(strength.score / 5) * 100}%`,
                      backgroundColor: strength.color,
                    }}
                  />
                </div>
                <p className="text-sm mt-1">Strength: {strength.label}</p>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Card */}
        <div className="bg-white p-8 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-bold mb-4 text-center">Usage Statistics</h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><span className="font-semibold">Total passwords generated:</span> {stats.totalGenerated}</p>
            <p><span className="font-semibold">Average length:</span> {stats.avgLength}</p>
            <p><span className="font-semibold">Used uppercase:</span> {stats.useUppercase} times</p>
            <p><span className="font-semibold">Used numbers:</span> {stats.useNumbers} times</p>
            <p><span className="font-semibold">Used symbols:</span> {stats.useSymbols} times</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PasswordGenerator;
