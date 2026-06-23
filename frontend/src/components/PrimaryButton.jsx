function PrimaryButton({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
  w-full
  bg-gradient-to-r
  from-indigo-600
  to-indigo-700
  text-white
  py-3
  rounded-xl
  font-semibold
  shadow-md
  hover:shadow-xl
  hover:-translate-y-0.5
  hover:from-indigo-700
  hover:to-indigo-800
  active:translate-y-0
  transition-all
  duration-300
"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
