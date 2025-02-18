import React from "react";

const TestimonialCard = ({ name, feedback, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full mb-4 border-2 border-blue-400"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 mt-2">"{feedback}"</p>
    </div>
  );
};

export default TestimonialCard;
