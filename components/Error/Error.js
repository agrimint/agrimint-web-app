const Error = ({ text }) => {
  return (
    <div className="my-4 rounded-[6px] p-2 bg-red-200">
      <p className="text-center text-red-900">{text}</p>
    </div>
  );
}

export default Error;