import React, { PropsWithChildren } from "react";
import NavBar from "./NavBar";

const ClientsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default ClientsLayout;
