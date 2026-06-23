import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import PrimaryButton from "../components/PrimaryButton";
import { API_URL } from "../config";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/user/courses`)
      .then((response) => {
        setCourses(response.data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    axios
      .get(`${API_URL}/user/purchases`, {
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
        `${API_URL}/user/purchase/${courseId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((response) => {
        console.log(response.data);

        const purchasedCourse = courses.find(
          (course) => course._id === courseId,
        );

        setPurchasedCourses([...purchasedCourses, purchasedCourse]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Courses
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Explore and purchase courses to grow your skills.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <Loader />
        ) : (
          courses.map((course) => {
            const isPurchased = purchasedCourses.some(
              (purchasedCourse) => purchasedCourse._id === course._id,
            );

            console.log(course.title, isPurchased);

            return (
              <div
                className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2 transition-all duration-300"
                key={course._id}
              >
                <div className="group h-52 rounded-xl mb-5 overflow-hidden relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600">
                  <div className="absolute inset-0 bg-black/10 group-hover:scale-110 transition-transform duration-500"></div>

                  <div className="relative h-full flex flex-col justify-end p-5">
                    <span className="w-fit px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
                      Development
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

                {isPurchased ? (
                  <button
                    className="w-full border border-slate-200 bg-slate-50 text-slate-700 py-3 rounded-xl font-medium cursor-not-allowed"
                    disabled
                  >
                    Purchased
                  </button>
                ) : (
                  <PrimaryButton onClick={() => handlePurchase(course._id)}>
                    Buy Course
                  </PrimaryButton>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Courses;
