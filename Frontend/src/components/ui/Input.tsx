interface InputProps {
  type: string;
  placeholder?: string;
  size: "sm" | "md";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  // Define size-based classes
  const sizeClasses = props.size === "sm" ? "text-[10px] p-2 w-full rounded-sm" : "text-[14px] p-2 w-full rounded-md";

  return (
    <div className="bg-black rounded-md border border-black text-white">
      <input
        className={`bg-black text-white border-black rounded-md ${sizeClasses}`}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
