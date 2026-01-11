import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { supabase } from "../../Supabase/supabaseClient";
import Button from "./Button";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      dispatch(logout());
    } else {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Button
      onClick={logoutHandler}
      size="sm"
      bgColor="bg-transparent"
      textColor="text-blue-600"
      className="hover:bg-blue-50"
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
