import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const user = useSelector((state) => state.auth.createdUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("all users", users);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // console.log("Token from admin", token);
        const response = await axios.get(`${BASE_URL}/api/v1/admin/allUsers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("response", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${BASE_URL}/api/v1/admin/deleteUser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAdminControl = async (userId, isAdmin) => {
    try {
      const token = localStorage.getItem("authToken");
      // if (userId == req.body.user._id) {
      //   console.log("You can't do this action.");
      //   return;
      // }
      await axios.put(
        `${BASE_URL}/api/v1/admin/adminControl/${userId}`,
        {
          isAdmin: !isAdmin,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAdminTask = async (userId, isAdmin) => {};

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Sidebar />
      <main className="flex flex-col p-6 ml-64">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm">
          {/* Welcome Message */}
          <div className="m-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back, {user.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">Here's your Admin Dashboard.</p>
          </div>
        </div>
      </main>
      <div className="flex flex-col p-6 ml-64">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 m-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleAdminControl(user._id, user.isAdmin)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 m-2"
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                      <button
                        onClick={() => handleAdminTask(user._id, user.isAdmin)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 m-2"
                      >
                        Assign Task
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
