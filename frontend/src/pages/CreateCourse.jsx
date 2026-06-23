import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import FormMessage from "../components/FormMessage";
import { API_URL } from "../config";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleCreateCourse() {
    if (!title.trim() || !price) {
      setMessage("Please fill all fields");
      return;
    }
    setMessage("");
    const token = localStorage.getItem("adminToken");
    setLoading(true);
    axios
      .post(
        `${API_URL}/admin/course`,
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
        setLoading(false);
        navigate("/admin/courses");
      })
      .catch((err) => {
        setLoading(false);
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
          {loading ? "Creating..." : "Create Course"}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CreateCourse;
