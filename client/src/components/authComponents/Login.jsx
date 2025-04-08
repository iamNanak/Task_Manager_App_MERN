import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../store/slice/authSlice.js";
import GoogleLogin from "../../pages/GoogleLogin.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);

      const { token, verifiedUser } = response.data;
      console.log(verifiedUser);

      localStorage.setItem("authToken", token);

      dispatch(login({ verifiedUser }));

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="777002517823-ks1pt96fh603dnqd55b0smui81mu3ta1.apps.googleusercontent.com">
        <GoogleLogin />
      </GoogleOAuthProvider>
    );
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Login
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
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
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          {/* Register Redirect */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?
            <a
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              {" "}
              Register here
            </a>
          </p>
          <br />
          <hr className="font-extrabold" />
          <br />
          <GoogleAuthWrapper />
        </div>
      </div>
    </>
  );
}

export default Login;
