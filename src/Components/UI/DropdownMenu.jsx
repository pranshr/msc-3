import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({
  options = [],
  label = "Select an option",
  onChange,
  openUp = false,
  bgColor = "bg-neutral-300",
  textSize = "text-lg",
  buttonHeight = "h-12", // NEW: fixed height for buttons
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`mx-3 px-4 text-left font-medium ${textSize} ${buttonHeight} rounded-md w-55 flex justify-between items-center ${bgColor}`}
      >
        <p className="truncate">{selected ? selected.label : label}</p>
        <i className="fa-solid fa-caret-down"></i>
      </button>

      {isOpen && (
        <div
          className={`absolute mx-3 overflow-hidden shadow-lg z-10 rounded-md ${openUp ? "bottom-full mb-3" : "top-full mt-3"}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="cursor-pointer transition"
            >
              <div className={`${bgColor} ${textSize} px-4 py-2 font-medium hover:bg-neutral-400 w-55`}>
                {option.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
