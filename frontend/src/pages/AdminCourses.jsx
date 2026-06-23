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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          My Courses
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Manage, edit and update your courses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="h-52 rounded-xl mb-5 overflow-hidden relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600">
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="relative h-full flex flex-col justify-end p-5">
                <span className="w-fit px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
                  Published
                </span>

                <h3 className="text-white text-2xl font-bold line-clamp-2">
                  {course.title}
                </h3>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Price
              </p>

              <p className="text-3xl font-bold text-slate-900">
                ₹{course.price}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all duration-200"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="flex-1 border border-red-200 text-red-600 py-3 rounded-xl font-medium hover:bg-red-50 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCourses;
