// import React from "react";
import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Headers } from "./Headers";

export const Layout = (props: PropsWithChildren<{}>) => {
  return (
    <div>
      <Headers />

      <main className="h-80v">{props.children}</main>

      <Footer />
    </div>
  );
};
