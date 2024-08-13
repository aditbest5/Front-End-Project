import Axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [user, setUser] = useState([]);
  const state = { user, setUser };
  const fetchUser = () => {
    Axios.get(`https://api-sosmed.project-adit.my.id/user/get-user`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        const { result } = res.data;
        setUser(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const functionHandler = { fetchUser };

  return (
    <GlobalContext.Provider value={{ state, functionHandler }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
