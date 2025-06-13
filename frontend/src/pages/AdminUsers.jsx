import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "../axios";
import useAuth from "../context/AuthContext";
import Navbar from "../components/Navbar";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
        console.log(error);
        
      enqueueSnackbar(error.response?.data?.message || "Error fetching users", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `/admin/users/${userId}/role`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar("User role updated successfully", { variant: "success" });
      fetchUsers();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error updating user role", {
        variant: "error",
      });
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      enqueueSnackbar("User deleted successfully", { variant: "success" });
      fetchUsers();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error deleting user", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li key={user._id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={user.displayPicture}
                        alt={user.username}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-medium text-gray-900">{user.username}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="user">User</option>
                        <option value="author">Author</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;