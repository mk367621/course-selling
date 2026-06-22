import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/courses")
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
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Courses</h1>
      <p className="text-slate-600 mb-10">
        Explore and purchase courses to grow your skills.
      </p>

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
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                key={course._id}
              >
                <div className="h-44 rounded-xl bg-slate-100 mb-5 flex items-center justify-center border border-slate-200">
                  <span className="text-slate-400 text-sm font-medium">
                    Course Thumbnail
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {course.title}
                </h3>
                <p className="text-slate-600 mb-4">Price: ₹{course.price}</p>

                {isPurchased ? (
                  <button
                    className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium cursor-not-allowed"
                    disabled
                  >
                    Purchased
                  </button>
                ) : (
                  <button
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all duration-200"
                    onClick={() => handlePurchase(course._id)}
                  >
                    Buy
                  </button>
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
