import React from "react";

const InputBox = ({ label, placeholder }) => {
  return (
    <>
      <label className="text-md text-left font-semibold text-black py-2">
        {label}
      </label>
      <input
        type="email"
        className="bg-gray-50 border  border-gray-900 text-gray-900 text-md rounded-lg block w-full p-2 mb-3"
        placeholder={placeholder}
      />
    </>
  );
};

export default InputBox;
