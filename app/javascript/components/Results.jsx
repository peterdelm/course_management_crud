import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const url = "/api/v1/results/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setResults(res))
      .catch(() => navigate("/"));
  }, []);

  const allResults = results.map((result, index) => (
    <tr>
      <th scope="row">{result.course}</th>
      <td>{result.student_name}</td>
      <td>{result.grade}</td>
    </tr>
  ));
  const noResult = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No Results yet. Why not? <Link to="/add_results">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Results List</h1>
          <p className="lead text-muted">
            Oh wow! So many cool results! I sure hope they belong_to someone...
          </p>
        </div>
      </section>
      <div className="py-5">
        <Navbar />
        <main className="container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Student</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>{results.length > 0 ? allResults : noResult}</tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Results;
