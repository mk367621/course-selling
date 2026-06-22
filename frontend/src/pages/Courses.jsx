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
    <div>
      <h1>Courses</h1>

      {courses.map((course) => {
        const isPurchased = purchasedCourses.some(
          (purchasedCourse) => purchasedCourse._id === course._id,
        );

        console.log(course.title, isPurchased);

        return (
          <div key={course._id}>
            <h3>{course.title}</h3>
            <p>Price: {course.price}</p>

            {isPurchased ? (
              <button disabled>Purchased</button>
            ) : (
              <button onClick={() => handlePurchase(course._id)}>Buy</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
