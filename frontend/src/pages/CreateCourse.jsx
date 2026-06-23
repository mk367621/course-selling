import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import FormMessage from "../components/FormMessage";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function handleCreateCourse() {
    if (!title.trim() || !price) {
      setMessage("Please fill all fields");
      return;
    }
    setMessage("");
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
        navigate("/admin/courses");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Create Course
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Create and publish a new course for your students.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <input
          className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Enter course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="h-5"></div>

        <input
          className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="number"
          placeholder="Enter course price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="h-6"></div>
        <FormMessage message={message} />

        <PrimaryButton onClick={handleCreateCourse}>
          Create Course
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CreateCourse;
