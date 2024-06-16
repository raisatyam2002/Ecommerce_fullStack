// import React from "react";

import { Footer } from "./Footer";
import { Headers } from "./Headers";
import { Helmet } from "react-helmet";
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
  title,
  description,
  keywords,
  author,
}: LayoutProps) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Headers />

      <main className="h-70v">
        <ToastContainer />
        {children}
      </main>

      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack project",
  keywords: "mongodb, react,node ,express",
  author: "satyam Rai",
};
