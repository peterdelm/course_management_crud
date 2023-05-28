import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const url = "/api/v1/students/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setStudents(res))
      .catch(() => navigate("/"));
  }, []);

  const deleteStudent = (student) => {
    const url = `/api/v1/students/destroy/${student.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    const body = {
      student,
    };

    fetch(url, {
      method: "DELETE",
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
      .catch((error) => console.log(error.message));

    fetch("/api/v1/students/index")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setStudents(res))
      .catch(() => navigate("/students"));
  };

  const allStudents = students.map((student, index) => (
    <tr>
      <th scope="row">{student.first_name + " " + student.last_name}</th>
      <td>{student.date_of_birth}</td>
      <td>{student.email}</td>
      <td>
        <button
          type="button"
          className="btn custom-button"
          onClick={() => {
            deleteStudent(student);
          }}
        >
          Delete Student
        </button>
      </td>
    </tr>
  ));
  const noStudent = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No Students yet. Why not <Link to="/new_student">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Students List</h1>
          <p className="lead text-muted">
            We’ve pulled together our most social butterflies, our most
            galaxy-brained nerds, and even a class clown or two. I hope they've
            done well...
          </p>
        </div>
      </section>
      <div className="py-5">
        <Navbar />
        <main className="container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Email</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{students.length > 0 ? allStudents : noStudent}</tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Students;
