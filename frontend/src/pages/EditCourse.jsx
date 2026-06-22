import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditCourse() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`http://localhost:3000/admin/course/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data.course);

        setTitle(response.data.course.title);
        setPrice(response.data.course.price);
      });
  }, [id]);

  function handleUpdateCourse() {
    const token = localStorage.getItem("adminToken");
    axios
      .put(
        `http://localhost:3000/admin/update-course/${id}`,
        {
          title,
          price,
        },
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
      <h1>Edit Course</h1>
      <input
        className="border p-2 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 rounded-md"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleUpdateCourse}>Update Course</button>
    </div>
  );
}

export default EditCourse;
