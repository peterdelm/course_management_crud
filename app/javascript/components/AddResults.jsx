import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddResults = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [student, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [submitted, setSubmitted] = useState("");

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

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const allStudents = students.map((student, index) => (
    <option value={student.id}>
      {student.last_name}, {student.first_name}
    </option>
  ));

  const allCourses = courses.map((course, index) => (
    <option value={course.id}>{course.name}</option>
  ));

  const noResult = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>No Results yet. Consider grading some papers?</h4>
    </div>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const resetForm = () => {
      setCourse("");
      setStudentName("");
      setGrade("");
      setSubmitted("Result Added!");
    };

    const url = "/api/v1/results/create";

    if (course.length == 0 || student.length == 0 || grade.length == 0) return;

    const body = {
      course,
      student,
      grade,
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
    <>
      <div className="container mt-5">
        <Navbar />
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a course grade for one of our awesome students!
            </h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Course</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={course}
                  required
                  onChange={(event) => onChange(event, setCourse)}
                >
                  <option selected>Select a course...</option>
                  {allCourses}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="student_name">Student</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={student}
                  required
                  onChange={(event) => onChange(event, setStudentName)}
                >
                  <option selected>Select a student...</option>
                  {allStudents}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="grade">Grade</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={grade}
                  onChange={(event) => onChange(event, setGrade)}
                >
                  <option selected value="">
                    Select a grade...
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Add Result
              </button>
            </form>
          </div>
          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
              <p className="lead">{submitted}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddResults;
