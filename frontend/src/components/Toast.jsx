function Toast({ message, type }) {
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg text-white z-50
      ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
}

export default Toast;
