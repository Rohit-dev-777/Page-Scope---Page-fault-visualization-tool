const Button = ({
  icon: Icon,
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  ...props
}) => {


  const baseStyle =
    "flex items-center justify-center font-medium rounded-lg transition duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed relative";

  const sizeStyles = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base";

  let variantStyles = "";

  
  if (variant === "primary") {
    variantStyles =
      "bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600";
  } else if (variant === "secondary") {
    variantStyles =
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100";
  } else if (variant === "outline") {
    variantStyles =
      "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
  }

  return (
    <button
      className={`${baseStyle} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && (
            <Icon className={size === "sm" ? "w-4 h-4 mr-1" : "w-5 h-5 mr-1"} />
          )}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
