import React, { useState } from "react";
import { Button } from "./Button";

const User = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Shivam",
      lastName: "Kaushik",
      _id: 1,
    },
  ]);
  return (
    <>
      <div className="grid grid-cols-1  rounded-3xl  m-4 ">
        <div className="font-bold mb-3">Users</div>
        <div className="border-slate-400 shadow-lg w-full border rounded-lg ">
          <div className="m-2">Search users...</div>
        </div>
      </div>
      <div>
        {users.map((user) => (
          <UserList key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function UserList({ user }) {
  return (
    <div className="flex justify-between items-center">
      <div className="m-4 mt-6 flex ">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300">
          <div className="text-2xl font-bold "> {user.firstName[0]}</div>
        </div>
        <div className="font-semibold text-xl m-2">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="mt-5">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
export default User;
