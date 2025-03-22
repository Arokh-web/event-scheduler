import React from "react";

const NotFound = () => {
  return (
    <div className="text-3xl font-bold flex flex-col items-center justify-center p-4">
      <p className="m-4">404: Page not found. Find it yourself.</p>
      <figure>
        <img
          src="404.png"
          alt="404"
          className="rounded-lg border-4 shadow-lg"
        />
      </figure>
    </div>
  );
};

export default NotFound;
