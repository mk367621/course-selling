import React, { useState } from "react";
import axios from "axios";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  function handleCreateCourse() {
    const token = localStorage.getItem("adminToken");
    axios
      .post(
        "http://localhost:3000/admin/course",
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
      <div>
        <h1>Create Course</h1>
        <input
          className="border p-2 rounded-md"
          type="text"
          placeholder="Enter course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded-md"
          type="number"
          placeholder="Enter course price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleCreateCourse}
        >
          Create course
        </button>
      </div>
    </div>
  );
}

export default CreateCourse;
