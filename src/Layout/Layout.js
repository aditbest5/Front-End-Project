import React from "react";
import MyNavbar from "../Components/Navbar";

const Layout = (props) => {
  return (
    <>
      <MyNavbar />
      {props.children}
    </>
  );
};

export default Layout;
