const Button = ({ children, variant = "primary", style = "circle", marginTop = 0, marginBottom = 0, stretch = true, textSize = "md", size = "big", ...props }) => {

    const base = `font-semibold rounded-full flex justify-center items-center focus:outline-none mt-${marginTop} mb-${marginBottom}
    text-${textSize}`;

    const variants = {
        primary: "bg-emerald-800 text-white hover:bg-emerald-900 focus:ring-3 focus:ring-emerald-500",
        secondary: "border-2 border-emerald-800 text-emerald-800 active:border-emerald-600 active:text-emerald-600",
    };

    const styles = {
        circle: "rounded-full",
        box: "rounded-md",
    }

    const sizes = {
        large: "py-4 px-6",
        big: "py-3 px-4",
        medium: "py-2 px-4",
        small: "py-1 px-3",
        extraSmall: "px-2"
    }

    const width = stretch ? "w-full" : "";

    return (
        <button className={`${base} ${variants[variant]} ${styles[style]} ${width} ${sizes[size]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
