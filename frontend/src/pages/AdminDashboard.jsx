import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Manage your courses and content from one place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/admin/create-course")}
          className="cursor-pointer bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-5">
            <span className="text-indigo-600 text-xl font-bold">+</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Create Course
          </h3>

          <p className="text-slate-600">Add a new course to your platform.</p>
        </div>

        <div
          onClick={() => navigate("/admin/courses")}
          className="cursor-pointer bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-2 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-5">
            <span className="text-indigo-600 text-xl font-bold">≡</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">My Courses</h3>

          <p className="text-slate-600">
            View and manage all your created courses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
