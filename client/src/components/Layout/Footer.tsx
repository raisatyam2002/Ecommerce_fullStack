import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="bg-custom-gradient text-white p-3 h-20v">
      <h1 className="text-center font-mono font-normal text-2xl">
        &copy; 2024 Company Name. All rights reserved
      </h1>
      <p className="text-center mt-4 space-x-4">
        <Link to="/about">About</Link>
        <Link to="/contac">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </p>
    </div>
  );
};
