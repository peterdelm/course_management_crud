import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddCourses = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const resetForm = () => {
      setName("");
      setSubmitted("Course Created!");
    };

    const url = "/api/v1/courses/create";

    if (name.length == 0) return;

    const body = {
      name,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(resetForm())
      .catch((error) => console.log(error.message));

    setTimeout(() => {
      setSubmitted("");
    }, 3000);
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a course to our awesome curriculum!
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Course Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Add Course
            </button>
          </form>
          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
              <p className="lead">{submitted}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourses;
