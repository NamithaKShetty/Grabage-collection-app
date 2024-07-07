import React, { useRef, useEffect } from 'react';
import videoSrc from "../assets/garbage_collection.mov"; // Assuming the assets folder is directly inside src
import garbageImage from "../assets/garbage2.png";

const CustomVideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play(); // Start playing the video on load
    }
  }, []);

  return (
    <div className="video-background" style={{ position: 'relative', maxWidth: '440px', maxHeight: '500px', margin: '0 auto', overflow: 'hidden', borderRadius: '10px' }}>
      <img src={garbageImage} alt="Garbage" className="background-image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2, borderRadius: '10px', filter: 'blur(10px)' }} />
      <div className="blur-background" style={{ position: 'absolute', top: 10, left: 10, width: '100%', height: '300%', backdropFilter: 'blur(100px)', borderRadius: '10px', zIndex: -1, boxShadow: '0 16px 16px rgba(0, 0, 0, 0.3)' }}></div>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '300%', height: '200%', objectFit: 'cover', borderRadius: '0px', margin: 0, padding: 0 }} // Ensure margin and padding are set to 0
      />
    </div>
  );
};

export default CustomVideoPlayer;
 