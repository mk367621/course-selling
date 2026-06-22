import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/admin/create-course")}
        >
          Create Course
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/admin/courses")}
        >
          My Courses
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
