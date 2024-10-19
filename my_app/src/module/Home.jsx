import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1
          style={{
            padding: "100px",
            fontSize: "5rem",
            fontWeight: "normal",
            color: "transparent",
            backgroundClip: "text",
            backgroundImage: "linear-gradient(to right,red,blue, black)",
          }}><b>
          Your Dream <br />
          Job is Waiting</b>
        </h1>
        {/* Increased font size and spacing */}
      </div>
    </>
  );
};

export default Home;
