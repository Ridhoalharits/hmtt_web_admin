import React from "react";
import User from "./components/User";

const page = () => {
  const data = {
    id: 1,
    name: "Ridho",
    isAdmin: true,
  };
  return (
    <div>
      <User user={data} />
    </div>
  );
};

export default page;
