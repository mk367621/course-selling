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
    <div>
      <h1>Purchased courses</h1>
      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>Price : {course.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Purchases;
