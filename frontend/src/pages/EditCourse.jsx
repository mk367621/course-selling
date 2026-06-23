import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function EditCourse() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get(`${API_URL}/admin/course/${id}`, {
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
    if (!title.trim() || !price) {
      setMessage("Please fill all fields");
      return;
    }

    setMessage("");
    const token = localStorage.getItem("adminToken");
    setLoading(true);
    axios
      .put(
        `${API_URL}/admin/update-course/${id}`,
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
          Edit Course
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Update your course information and pricing.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <input
          className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
        />

        <div className="h-5"></div>

        <input
          className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Course Price"
        />

        <div className="h-6"></div>
        {message && (
          <p className="text-red-500 text-sm font-medium mb-4">{message}</p>
        )}

        <PrimaryButton onClick={handleUpdateCourse}>
          {loading ? "Updating..." : "Update Course"}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default EditCourse;
