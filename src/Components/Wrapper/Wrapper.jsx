import React from "react";
import Navbar from "../Navbar/Navbar";

const Wrapper = ({ children }) => {
  const currentPath = window.location.pathname;
  if (currentPath === "/" || currentPath === "/register") {
    return <>{children}</>;
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Wrapper;
