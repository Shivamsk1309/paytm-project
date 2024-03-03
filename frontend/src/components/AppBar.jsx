import React from "react";

const AppBar = () => {
  return (
    <>
      <div className="border-2  font-medium shadow-md flex justify-between items-center rounded-3xl border-gray-600">
        <div className=" ml-4">PayTM App</div>
        <div className="flex justify-center items-center ">
          <div className="mr-2">Hello</div>
          <div className="rounded-full flex justify-center items-center bg-slate-400 h-10 w-10 m-2">
            <div className="text-2xl">S</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
