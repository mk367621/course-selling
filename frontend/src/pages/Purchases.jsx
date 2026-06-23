import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

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
      .get(`${API_URL}/user/purchases`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);

        setCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          My Learning
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Continue learning from your purchased courses.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2 transition-all duration-300"
            key={course._id}
          >
            <div className="h-52 rounded-xl mb-5 overflow-hidden relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600">
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="relative h-full flex flex-col justify-end p-5">
                <span className="w-fit px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
                  Purchased
                </span>

                <h3 className="text-white text-2xl font-bold line-clamp-2">
                  {course.title}
                </h3>
              </div>
            </div>

            <div className="flex justify-between items-center mb-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Price
                </p>

                <p className="text-3xl font-bold text-slate-900">
                  ₹{course.price}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">Lifetime Access</p>
              </div>
            </div>
            <button
              disabled
              className="w-full border border-slate-200 bg-slate-50 text-slate-700 py-3 rounded-xl font-medium cursor-not-allowed"
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
