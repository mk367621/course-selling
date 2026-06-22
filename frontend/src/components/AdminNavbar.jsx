import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  function handleLogout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-blue-600 text-xl font-bold">Admin Panel</h1>

      {token && (
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/admin/create-course")}>
            Create Course
          </button>

          <button onClick={() => navigate("/admin/courses")}>My Courses</button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
