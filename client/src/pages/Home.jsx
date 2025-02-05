import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Hero Section */}
        <header className="bg-gray-900 text-white py-20 text-center">
          <h1 className="text-4xl font-bold">
            Simplify Your Tasks, Boost Productivity!
          </h1>
          <p className="text-lg mt-2">
            A powerful task manager to help you stay organized.
          </p>
          <div className="mt-6">
            <Link
              to="/register"
              className="bg-stone-100 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200"
            >
              Get Started for Free
            </Link>
          </div>
        </header>

        {/* Features Section */}
        <section className="container mx-auto py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Task Scheduling</h3>
              <p className="text-gray-600 mt-2">
                Plan, organize, and track tasks effortlessly.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Collaborate Easily</h3>
              <p className="text-gray-600 mt-2">
                Work with your team in real-time.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              <p className="text-gray-600 mt-2">
                Get smart predictions for task completion time.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gray-900 text-white">
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="mt-2">
            Sign up now and start managing your tasks efficiently.
          </p>
          <div className="mt-4">
            <Link
              to="/register"
              className="bg-stone-100 hover:bg-slate-200 text-blue-600 px-6 py-3 rounded-lg font-semibold"
            >
              Create Account
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
