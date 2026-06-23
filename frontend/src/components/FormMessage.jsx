function FormMessage({ message }) {
  if (!message) return null;

  return <p className="text-red-500 text-sm font-medium mb-4">{message}</p>;
}

export default FormMessage;
