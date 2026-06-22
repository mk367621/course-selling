import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(
        "http://localhost:3000/admin/course/bulk",

        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((response) => {
        setCourses(response.data.course);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  function handleDeleteCourse(courseId) {
    const token = localStorage.getItem("adminToken");
    axios
      .delete(`http://localhost:3000/admin/course/${courseId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourses(courses.filter((course) => course._id !== courseId));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold">{course.title}</h3>

            <p className="text-gray-600">₹{course.price}</p>
            <button
              onClick={() => navigate(`/admin/edit-course/${course._id}`)}
            >
              Edit
            </button>
            {"      "}
            <button onClick={() => handleDeleteCourse(course._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCourses;
