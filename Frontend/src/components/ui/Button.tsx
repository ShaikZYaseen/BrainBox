import { ReactElement } from "react";

interface ButtonInterface {
    text: string;
    startIcon?: ReactElement;
    size: "lg" | "sm" | "md";
    endIcon?: ReactElement;
    loading?:boolean,
    onClick?: () => void;
    variant: "primary" | "secondary";
}

const sizeStyles = {
    lg: "px-8 py-4 text-xl rounded-xl",
    md: "px-4 py-2 text-md rounded-md",
    sm: "px-3 py-2 text-[10px] rounded-md",
};

const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800", // Add hover effect for primary
    secondary: "bg-white text-black hover:bg-gray-100 hover:text-gray-800", // Add hover effect for secondary
};

export function Button(props: ButtonInterface) {
    const { text, startIcon, endIcon, size, variant,loading, onClick } = props;

    const className = `${sizeStyles[size]} ${variantStyles[variant]} flex items-center justify-center transition duration-200`;

    return (
        <button disabled={loading || false} className={className} onClick={onClick}>
            {startIcon && <span className="mr-2">{startIcon}</span>}
            <span>{loading ? "loading" : text}</span>
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
}
