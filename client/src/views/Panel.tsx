import React from "react";
import { useNavigate } from "react-router-dom";

const Panel = () => {
  const [user, setUser] = React.useState<string>("User");
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    navigate("/");
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(sessionStorage.getItem("user") as string);
    } else if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user") as string);
    } else navigate("/");
  }, []);
  return (
    <div>
      <h1>Welcome {user} !!!</h1>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export { Panel };
