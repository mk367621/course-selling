import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Purchases() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:3000/user/purchases", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);

        setCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Purchased courses</h1>
      <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
            key={course._id}
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-600">Price : ₹{course.price}</p>
            <button
              disabled
              className="bg-green-500 text-white px-3 py-2 rounded-md mt-2"
            >
              Purchased
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Purchases;
