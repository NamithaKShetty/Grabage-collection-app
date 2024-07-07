import React from 'react';
import { Link } from 'react-router-dom';
import bannerBackground from '../assets/bannerback.png'; 
import bannerImage from '../assets/bannerpage.png'; 
import CustomVideoPlayer from './CustomVideoPlayer'; // Import CustomVideoPlayer component
import garbageVideo from '../assets/garbage_collection.mov'; // Replace with your actual video asset

function Banner() {
  const bannerStyle = {
    backgroundImage: `url(${bannerBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '75vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageContainerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '75vh', // Adjust height as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10" style={bannerStyle}>
        <div className="w-full md:w-1/2 mt-24 md:mt-36 flex flex-col justify-center items-center text-center space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-black">
            Welcome to Your Local Garbage Collection Service!{' '}
            <span className="text-green-500" style={{ color: '#006600' }}>
              Keeping your community clean!
            </span>
          </h1>
          <p className="text-sm md:text-xl text-black">
            Choose your service, schedule a convenient pickup time, and let us handle the rest.
            We are committed to making your environment cleaner and healthier.
          </p>
          <Link to="/signup">
            <button 
              className="btn mt-6 bg-006600 text-black hover:bg-006600-hover" 
              style={{ backgroundColor: '#006600', color: '#ffffff' }}
            >
              Get Started
            </button>
          </Link>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center items-center" style={imageContainerStyle}>
          <img src={bannerImage} alt="Garbage Recycling" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} />
        </div>
      </div>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-10">
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-6">How NoKasa Works</h2>
        <div className="flex justify-center items-center">
          <CustomVideoPlayer /> {/* Replace the existing video with CustomVideoPlayer */}
        </div>
      </div>
    </>
  );
}

export default Banner;
