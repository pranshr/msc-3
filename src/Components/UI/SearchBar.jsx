import { useState, useRef, useEffect } from "react";
import InputField from "./InputField";



const SearchBar = ({ options = [], placeholder = "Search..." , onSelect}) => {
    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Filter options based on input
    useEffect(() => {
        if (query.trim() === "") {
            setFilteredOptions([]);
            setIsOpen(false);
        } else {
            const filtered = options.filter((opt) =>
            opt.label.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredOptions(filtered);
            setIsOpen(filtered.length > 0);
        }
    }, [query, options]);

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
        setQuery(option.label);
        setIsOpen(false);
        onSelect?.(option.value);
    };

    // Highlight matching text
    const highlightMatch = (text) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="font-bold text-indigo-600">
            {part}
            </span>
        ) : (
            <span key={index}>{part}</span>
        )
        );
    };

    return (
        <div className="relative w-full max-w-md" ref={dropdownRef}>
        {/* Input Field */}
        <InputField
        label="Search Tools"
        id="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        marginBottom={2}
        />

        {/* Suggestions Dropdown */}
        {isOpen && (
            <div className="absolute w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-10 overflow-hidden">
            {filteredOptions.map((option) => (
                <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer hover:bg-slate-100 transition"
                >
                {highlightMatch(option.label)}
                </div>
            ))}
            {filteredOptions.length === 0 && (
                <div className="px-4 py-2 text-slate-400">No results found</div>
            )}
            </div>
        )}
        </div>
    );
};

export default SearchBar;
