import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is near the bottom of the page
      const isNearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
      setShowButton(isNearBottom);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className='cta'>
      <p className='cta-text'>
        Have a project in mind? <br className='sm:block hidden' />
        Let’s build something together!
      </p>
      <Link to='/contact' className='btn'>
        Contact
      </Link>
      {showButton && (
        <button
          onClick={scrollToTop} 
          className={`lg:fixed bottom-10  right-10 md:right-20 lg:right-20 xl:right-20 2xl:right-50 w-12 h-12 text-lg rounded-full  text-white bg-gradient-to-r  from-[#4370ec] to-[#0051ff] focus:ring-4 focus:outline-none focus:ring-blue-300  flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
            showButton ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ↑
        </button>
      )}
    </section>
  );
};

export default CTA;
