import React from "react";
import { Button } from "../components/Button";

const SendMoney = () => {
  return (
    <>
      <div class="flex justify-center h-screen bg-gray-200">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-max text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="px-6 pb-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-900 shadow flex items-center justify-center">
                  <span className="text-2xl text-white">A</span>
                </div>
                <h3 className="text-2xl font-semibold">Friend's Name</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <Button label={"Send Money"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
