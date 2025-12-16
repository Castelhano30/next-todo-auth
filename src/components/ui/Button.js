export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold",
        "bg-gray-900 text-white hover:bg-gray-800 transition",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
