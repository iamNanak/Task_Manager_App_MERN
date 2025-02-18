import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TestimonialCard from "../components/TestimonialCard";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col">
        {/* Hero Section */}
        <header className="bg-blue-100 text-gray-900 py-20 text-center px-4">
          <h1 className="text-5xl font-bold leading-tight">
            Simplify Your Tasks, Boost Productivity!
          </h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            A powerful task manager to help you stay organized and work
            efficiently.
          </p>
          {/* <div className="mt-6">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started for Free
            </Link>
          </div> */}
        </header>

        <section className="py-16 bg-gray-100 text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Why Use a Task Manager?</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 mb-6">
            Managing tasks efficiently saves time, reduces stress, and boosts
            productivity. Stay organized and never miss a deadline again with
            our powerful task manager!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Stay Organized</h3>
              <p className="text-gray-600 mt-2">
                Track tasks in one place and never forget important deadlines.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Boost Productivity</h3>
              <p className="text-gray-600 mt-2">
                Prioritize tasks effectively and get more done.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Reduce Stress</h3>
              <p className="text-gray-600 mt-2">
                Eliminate confusion and feel in control of your workload.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Task Scheduling</h3>
              <p className="text-gray-600 mt-2">
                Plan, organize, and track tasks effortlessly.
              </p>
            </div>
            <div className="p-6 bg-gray-50 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Collaborate Easily</h3>
              <p className="text-gray-600 mt-2">
                Work with your team in real-time.
              </p>
            </div>
            <div className="p-6 bg-gray-50 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              <p className="text-gray-600 mt-2">
                Get smart predictions for task completion time.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-blue-50 text-center">
          <h2 className="text-3xl font-bold mb-8">TESTIMONIALS</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Mr Suraj Adhikari"
              feedback="“ Working with Zidio was a game-changer for our business. Their expertise and attention to detail ensured that our project was not only completed on time but also surpassed our initial vision. ✨. ” "
              image="../public/pintu.webp"
            />
            <TestimonialCard
              name="David"
              feedback="“ The team at Zidio showed exceptional understanding of our goals and provided invaluable guidance. Their expertise made a significant impact, and we highly recommend their services. ”   "
              image="../public/Dave.webp"
            />
            <TestimonialCard
              name="Mr. Ranjan Kumar Senapati"
              feedback="“ Zidio exceeded our expectations. Their team was professional, responsive, and delivered a high-quality solution that perfectly aligned with our needs. We couldn't be happier with the. ”"
              image="../public/suraj.webp"
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
