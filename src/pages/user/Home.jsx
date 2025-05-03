import React from 'react';
import About from './About';
import BodyImage from "../../assets/body-img.jpg";
import Feature from './Feature';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative bg-black text-white text-center" id='home'>
      {/* Background Image */}
      <div className="absolute inset-0 "> {/* Set z-index to push behind content */}
        <img 
          src={BodyImage} 
          alt="Finance Background" 
          className="w-full h-400 object-cover " 
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-5xl font-extrabold leading-snug max-w-3xl">
          From{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
            Budgeting to Investing
          </span>{' '}
          – Your Ultimate Financial HQ.
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
          Take control of your finances with FinTrack. Track your expenses, set budgets, and make smarter investment decisions effortlessly.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8">
          <Link to="/login">
                    <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white hidden md:inline transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full">
                      Join us Today
                    </button>
                  </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="relative z-10 mt-20">  {/* Add margin to separate it */}
        <About />
      </div>

      <div className="">  {/* Add margin to separate it */}
        <Feature/>
      </div>

      

    </div>
  );
};

export default Home;
