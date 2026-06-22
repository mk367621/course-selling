import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/courses")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    axios
      .get("http://localhost:3000/user/purchases", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setPurchasedCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  function handlePurchase(courseId) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post(
        `http://localhost:3000/user/purchase/${courseId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => {
          const isPurchased = purchasedCourses.some(
            (purchasedCourse) => purchasedCourse._id === course._id,
          );

          console.log(course.title, isPurchased);

          return (
            <div
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition "
              key={course._id}
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-600">Price: ₹{course.price}</p>

              {isPurchased ? (
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded-md mt-2"
                  disabled
                >
                  Purchased
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-3 py-2 mt-2 rounded-md cursor-pointer hover:bg-blue-600"
                  onClick={() => handlePurchase(course._id)}
                >
                  Buy
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
