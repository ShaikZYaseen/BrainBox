import { ReactElement } from "react";

interface ButtonInterface {
    text: string;
    startIcon?: ReactElement;
    size: "lg" | "sm" | "md";
    endIcon?: ReactElement;
    variant: "primary" | "secondary";
}

const sizeStyles = {
    lg: "px-8 py-4 text-xl rounded-xl",
    md: "px-4 py-2 text-md rounded-md",
    sm: "px-2 py-1 text-sm rounded-sm",
};

const variantStyles = {
    primary: "bg-black text-white",
    secondary: "bg-white text-black", // Fixed text color
};

export function Button(props: ButtonInterface) {
    const className = `${sizeStyles[props.size] ?? ""} ${variantStyles[props.variant] ?? ""}`;

    return (
        <button className={className}>
            <div className="flex items-center">
                {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
                <span className="pl-2 py-1 rounded-md pr-2">{props.text}</span>
                {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
            </div>
        </button>
    );
}
