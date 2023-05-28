import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const url = "/api/v1/courses/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setCourses(res))
      .catch(() => navigate("/"));
  }, []);

  const deleteCourse = (course) => {
    const url = `/api/v1/courses/destroy/${course.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    const body = {
      course,
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

    fetch("/api/v1/courses/index")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setCourses(res))
      .catch(() => navigate("/courses"));
  };

  const allCourses = courses.map((course, index) => (
    <tr>
      <th scope="row">{course.name}</th>
      <td>
        <button
          type="button"
          className="btn custom-button"
          onClick={() => {
            deleteCourse(course);
          }}
        >
          Delete Course
        </button>
      </td>
    </tr>
  ));
  const noCourse = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No Courses yet. Why not? <Link to="/new_course">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Courses List</h1>
          <p className="lead text-muted">
            Probably the best curriculum you've ever seen.
          </p>
        </div>
      </section>
      <div className="py-5">
        <Navbar />
        <main className="container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{courses.length > 0 ? allCourses : noCourse}</tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Courses;
