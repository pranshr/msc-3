const InputField = ({
    marginTop = 0,
    marginBottom = 0,
    label,
    id,
    type = "text",
    value,
    onChange,
    error,
    errorMessage,
    placeholder,
    required = false,
    children,

}) => {
    return (
        <>
            <div className={`mt-${marginTop}`}>
                <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
                    {label}
                </label>

                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full p-2 border rounded-sm mt-2 focus:outline-none focus:ring-2
                    ${error
                        ? "border-red-400 focus:ring-red-400"
                        : "border-emerald-300 focus:ring-indigo-500"
                    }`}
                />

            </div>
            <div className={`text-sm mb-${marginBottom} mt-1 flex justify-between`}>
            {error &&
                <p className="text-red-500 font-bold">{errorMessage}</p>
            }
            {children}
            </div>
        </>
    );
};


export default InputField;
