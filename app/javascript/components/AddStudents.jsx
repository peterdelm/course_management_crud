import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddStudents = () => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [resultMessage, setResultMessage] = useState([]);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const successMessageTimeout = () => {
    setTimeout(() => {
      setResultMessage([]);
    }, 4000);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const resetForm = () => {
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setEmail("");
    };

    const url = "/api/v1/students/create";

    if (
      first_name.length == 0 ||
      last_name.length == 0 ||
      date_of_birth.length == 0 ||
      email.length == 0
    )
      return;

    const body = {
      first_name,
      last_name,
      date_of_birth,
      email,
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        errorString = Object.values(res)[0];
        resultType = Object.keys(res)[0];
        if (resultType != "id") {
          setResultMessage(errorString);
        } else {
          setResultMessage("Student enrolled!");
          successMessageTimeout();
          resetForm();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new student to our awesome school!
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={first_name}
                className="form-control"
                required
                onChange={(event) => onChange(event, setFirstName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={last_name}
                className="form-control"
                required
                onChange={(event) => onChange(event, setLastName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_of_birth">
                Date of Birth &#40;DD/MM/YYYY&#41;
              </label>
              <input
                type="text"
                name="date_of_birth"
                id="date_of_birth"
                value={date_of_birth}
                className="form-control"
                required
                onChange={(event) => onChange(event, setDateOfBirth)}
              />
            </div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              className="form-control"
              required
              onChange={(event) => onChange(event, setEmail)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Add Student
            </button>
          </form>

          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
              <p className="lead">{resultMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudents;
