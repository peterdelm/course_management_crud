import React from "react";
import Navbar from "../components/Navbar";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <Navbar />
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Shyftlabs School for Gifted Youngsters</h1>
        <p className="lead">
          Powered by an academic management application designed by Peter Del
          Mastro.
        </p>
        <hr className="my-4" />
      </div>
    </div>
  </div>
);
