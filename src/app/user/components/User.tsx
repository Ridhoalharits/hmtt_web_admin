"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  isAdmin?: boolean;
};

export const handleUserAction = (userName: string, action: string) => {
  console.log(`User ${userName} performed action: ${action}`);
  if (userName == null) {
    return 404;
  } else {
    return `${userName} performed ${action}`;
  }
};

const User = ({ user }: { user: User }) => {
  const [ischecked, setChecked] = useState(false);

  return (
    <div>
      <h2>User Profile</h2>
      {user.isAdmin && <Button>Edit Button</Button>}
      <div>
        <strong>Name : </strong>
        {user.name}
      </div>
      <div>
        <strong>ID : </strong>
        {user.id}
      </div>
      <div>
        {/* Ensure Checkbox is rendered properly with checked and onChange */}
        <Checkbox
          id="agree"
          checked={ischecked}
          onCheckedChange={() => setChecked(!ischecked)} // use the correct handler for onChange
        >
          Agree
        </Checkbox>
        <label htmlFor="agree">I understand</label>
        {/* Disable the button when the checkbox is unchecked */}
        <Button
          onClick={() => handleUserAction(user.name, "submitted")}
          name="Submit"
          disabled={!ischecked}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default User;
