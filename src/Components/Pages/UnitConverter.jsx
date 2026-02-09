import { useState, useEffect } from "react";
import SearchBar from "../UI/SearchBar";

const units = {
  Length: ["meters", "kilometers", "miles", "feet"],
  Weight: ["grams", "kilograms", "pounds", "ounces"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
};

const conversionFunctions = {
  Length: {
    meters: {
      kilometers: (v) => v / 1000,
      miles: (v) => v / 1609.34,
      feet: (v) => v * 3.28084,
      meters: (v) => v,
    },
    kilometers: {
      meters: (v) => v * 1000,
      miles: (v) => v / 1.60934,
      feet: (v) => v * 3280.84,
      kilometers: (v) => v,
    },
    miles: {
      meters: (v) => v * 1609.34,
      kilometers: (v) => v * 1.60934,
      feet: (v) => v * 5280,
      miles: (v) => v,
    },
    feet: {
      meters: (v) => v / 3.28084,
      kilometers: (v) => v / 3280.84,
      miles: (v) => v / 5280,
      feet: (v) => v,
    },
  },
  Weight: {
    grams: {
      kilograms: (v) => v / 1000,
      pounds: (v) => v / 453.592,
      ounces: (v) => v / 28.3495,
      grams: (v) => v,
    },
    kilograms: {
      grams: (v) => v * 1000,
      pounds: (v) => v * 2.20462,
      ounces: (v) => v * 35.274,
      kilograms: (v) => v,
    },
    pounds: {
      grams: (v) => v * 453.592,
      kilograms: (v) => v / 2.20462,
      ounces: (v) => v * 16,
      pounds: (v) => v,
    },
    ounces: {
      grams: (v) => v * 28.3495,
      kilograms: (v) => v / 35.274,
      pounds: (v) => v / 16,
      ounces: (v) => v,
    },
  },
  Temperature: {
    Celsius: {
      Fahrenheit: (v) => v * 9 / 5 + 32,
      Kelvin: (v) => v + 273.15,
      Celsius: (v) => v,
    },
    Fahrenheit: {
      Celsius: (v) => (v - 32) * 5 / 9,
      Kelvin: (v) => (v - 32) * 5 / 9 + 273.15,
      Fahrenheit: (v) => v,
    },
    Kelvin: {
      Celsius: (v) => v - 273.15,
      Fahrenheit: (v) => (v - 273.15) * 9 / 5 + 32,
      Kelvin: (v) => v,
    },
  },
};

export default function UnitConverter() {
  const [unitType, setUnitType] = useState("Length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [frequency, setFrequency] = useState({});

  useEffect(() => {
    if (value === "" || isNaN(Number(value))) {
      setResult("");
      return;
    }
    const converted =
      conversionFunctions[unitType][fromUnit][toUnit](Number(value));
    setResult(converted.toFixed(4));
  }, [value, fromUnit, toUnit, unitType]);

  const saveConversion = () => {
    if (!value || isNaN(Number(value)) || !result) return;

    const item = {
      id: Date.now(),
      from: fromUnit,
      to: toUnit,
      value,
      result,
    };

    setHistory((prev) => [item, ...prev.slice(0, 9)]);

    const key = `${fromUnit}->${toUnit}`;
    setFrequency((prev) => {
      const updated = { ...prev, [key]: (prev[key] || 0) + 1 };
      return Object.fromEntries(
        Object.entries(updated).sort((a, b) => b[1] - a[1]).slice(0, 5)
      );
    });
  };

  const loadFrequentConversion = (key) => {
    const [from, to] = key.split("->");

    const newUnitType = Object.keys(units).find((type) =>
      units[type].includes(from)
    );

    if (!newUnitType) return;

    setUnitType(newUnitType);
    setFromUnit(from);
    setToUnit(to);
    setValue("");
    setResult("");
  };

  const fromOptions = units[unitType].map((u) => ({ label: u, value: u }));
  const toOptions = units[unitType].map((u) => ({ label: u, value: u }));

  return (
    <div className="bg-gray-100 text-gray-900 h-full p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 h-[80vh]">

        {/* LEFT: Converter */}
        <div className="flex-1 bg-white p-6 rounded shadow overflow-auto">

          {/* Unit Type */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Unit Type</label>
            <select
              className="w-full border p-2 rounded"
              value={unitType}
              onChange={(e) => {
                const type = e.target.value;
                setUnitType(type);
                setFromUnit(units[type][0]);
                setToUnit(units[type][1]);
                setValue("");
                setResult("");
              }}
            >
              {Object.keys(units).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Input / Output Blocks */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Input Block */}
            <div className="border rounded p-4 bg-gray-50">
              <label className="block font-semibold mb-2">Input</label>

              <input
                type="number"
                className="w-full border border-gray-400 p-3 mb-3
                           rounded-none text-xl font-semibold
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <SearchBar
                options={fromOptions}
                placeholder="From unit..."
                value={fromUnit}
                onSelect={setFromUnit}
              />
            </div>

            {/* Output Block */}
            <div className="border rounded p-4 bg-gray-50">
              <label className="block font-semibold mb-2">Output</label>

              <input
                type="text"
                className="w-full border border-gray-300 p-3 mb-3
                           rounded-none text-xl font-semibold
                           bg-gray-200"
                readOnly
                value={result}
              />

              <SearchBar
                options={toOptions}
                placeholder="To unit..."
                value={toUnit}
                onSelect={setToUnit}
              />
            </div>

          </div>

          {/* Swap */}
          <div className="flex justify-center mb-4">
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setFromUnit(toUnit);
                setToUnit(fromUnit);
                setValue("");
                setResult("");
              }}
            >
              ⬌ Swap
            </button>
          </div>

          {/* Actions */}
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded"
            onClick={saveConversion}
            disabled={!result}
          >
            Save Conversion
          </button>
        </div>

        {/* RIGHT: History + Frequent */}
        <div className="flex-1 flex flex-col gap-6 h-full">

          {/* History */}
          <div className="bg-white p-6 rounded shadow flex-1 overflow-auto">
            <h2 className="text-2xl font-bold mb-2">Recent Conversions</h2>
            <ul className="space-y-2">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="p-2 bg-gray-100 rounded"
                >
                  {item.value} {item.from} → {item.result} {item.to}
                </li>
              ))}
            </ul>
          </div>

          {/* Frequent */}
          <div className="bg-white p-6 rounded shadow flex-1 overflow-auto">
            <h2 className="text-2xl font-bold mb-2">Frequent Conversions</h2>
            <ul className="space-y-2">
              {Object.entries(frequency).map(([key, count]) => (
                <li
                  key={key}
                  className="p-2 bg-yellow-100 rounded flex justify-between cursor-pointer hover:bg-yellow-200"
                  onClick={() => loadFrequentConversion(key)}
                >
                  <span>{key.replace("->", " → ")}</span>
                  <span className="font-bold">{count}x</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
