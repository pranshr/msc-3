import { useState, useRef, useEffect } from "react";

const UserDropdown = ({ options, onSelect, username }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionSelect = (option) => {
        onSelect(option); // This will trigger onUserOptionSelect in Navbar
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
        <div className="relative">
        <button
        className="flex items-center justify-between space-x-2 px-4 py-2 text-white bg-gray-800 rounded-md gap-4"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown visibility
        >
        <span className="flex gap-3">
            <i className="fa-solid fa-circle-user text-2xl text-white"></i>
            <span>{username}</span>
        </span>
        <i className="fa-solid fa-caret-down"></i>
        </button>

        {isOpen && (
            <div className="absolute overflow-hidden shadow-lg z-10 rounded-md bg-slate-800 text-white bottom-full mb-3 left-0 right-0">
            {options.map((option) => (
                <div
                key={option.value}
                onClick={() => handleOptionSelect(option)} // Trigger onSelect when option is clicked
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                {option.label}
                </div>
            ))}
            </div>
        )}
        </div>
    );
};


export default UserDropdown;
