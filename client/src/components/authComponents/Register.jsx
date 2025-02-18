import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../store/slice/authSlice.js";
import Navbar from "../Navbar.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/register`,
        formData
      );
      console.log(response);

      dispatch(login({ user: response.data.createdUser })); // Updating Redux store
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Sign Up
          </h2>
          <p className="text-center text-gray-500 mb-5">
            Create your account in seconds!
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              {" "}
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
