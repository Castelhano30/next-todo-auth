export default function Input(props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2",
        "text-sm outline-none",
        "focus:border-gray-900 focus:ring-2 focus:ring-gray-200",
        props.className || "",
      ].join(" ")}
    />
  );
}
