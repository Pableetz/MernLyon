import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Wrapper.css";

const Wrapper = ({ children }) => {
  const currentPath = window.location.pathname;
  if (currentPath === "/" || currentPath === "/register") {
    return <>{children}</>;
  }

  return (
    <div className="wrapper-container">
      <Navbar />
      {children}
    </div>
  );
};

export default Wrapper;
