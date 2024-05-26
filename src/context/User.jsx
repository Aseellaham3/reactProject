import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();
const UserContextProvider = ({children}) => {
  const [userName, setUserName] = useState("");


  const getUserData = () => {

    const token = localStorage.getItem("userToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.userName);
    }
  };
  useEffect(() => {
    getUserData();
  });


  return (
    <UserContext.Provider value={ {userName, getUserData , setUserName}}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;


