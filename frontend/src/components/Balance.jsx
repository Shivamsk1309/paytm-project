import React from "react";

const Balance = ({ balance }) => {
  return (
    <>
      <div className="flex justify-start items-center border-2 rounded-2xl border-slate-500">
        <div className="m-3 text-lg text-black font-bold">Your Balance |</div>
        <div className="m-3">
          {"\u20B9"}
          {balance}
        </div>
      </div>
    </>
  );
};

export default Balance;
