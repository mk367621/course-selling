import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  function handleLogout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">A</span>
        </div>

        <div>
          <h1 className="text-slate-900 font-bold text-xl leading-none">
            Admin Panel
          </h1>

          <p className="text-xs text-slate-500 mt-0.5">Course Management</p>
        </div>
      </div>

      {token && (
        <div className="flex gap-8 items-center">
          <button
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
            onClick={() => navigate("/admin/create-course")}
          >
            Create Course
          </button>

          <button
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
            onClick={() => navigate("/admin/courses")}
          >
            My Courses
          </button>

          <button
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-all duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
