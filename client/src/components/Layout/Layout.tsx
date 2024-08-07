// import React from "react";

import { Footer } from "./Footer";
import { Headers } from "./Headers";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface LayoutProps {
  children: React.ReactNode; // Specify the type of children prop
  title?: string; // Optional props for meta tags
  description?: string;
  keywords?: string;
  author?: string;
}
export const Layout = ({
  children,
  title = "Ecommerce app",
  description = "mern stack project",
  keywords = "mongodb, react, node, express",
  author = "satyam Rai",
}: LayoutProps) => {
  return (
    <div className="Layout">
      <HelmetProvider>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>

      <Headers />

      <main className="Main ">
        <ToastContainer />
        {children}
      </main>

      <Footer />
    </div>
  );
};
// Layout.defaultProps = {
//   title: "Ecommerce app",
//   description: "mern stack project",
//   keywords: "mongodb, react,node ,express",
//   author: "satyam Rai",
// };
