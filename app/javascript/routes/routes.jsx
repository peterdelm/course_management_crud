import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Students from "../components/Students";
import AddStudents from "../components/AddStudents";
import Courses from "../components/Courses";
import AddCourses from "../components/AddCourses";
import Results from "../components/Results";
import AddResults from "../components/AddResults";


export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<Students />} />
      <Route path="/add_students" element={<AddStudents />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/add_courses" element={<AddCourses />} />
      <Route path="/results" element={<Results />} />
      <Route path="/add_results" element={<AddResults />} />
    </Routes>
  </Router>
);