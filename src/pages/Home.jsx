import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Event Scheduler!</h1>
      <h2 id="home">
        Please <Link to="signin">sign in</Link> to view a full list of available
        events.
      </h2>
    </div>
  );
};

export default Home;
