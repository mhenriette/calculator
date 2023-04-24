const Button = ({
  children,
  className,
  onClick,
  large,
  clicked,
  index,
  isDisabled,
}) => {
  return (
    <>
      <button
        className={` h-20 border-gray-500 border text-center w-full ${className} ${
          large && "col-span-2"
        } ${
          clicked === index &&
          clicked !== undefined &&
          "bg-indigo-100 text-orange-800"
        } `}
        onClick={onClick}
        disabled={isDisabled && children === "."}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
