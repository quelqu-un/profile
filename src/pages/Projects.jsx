import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils'; // Ensure this is correctly imported
import CTA from "../components/CTA";
import { projects } from "../constants";

const truncateText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit) + '...';
};

const ProjectDescription = ({ description }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const limit = 200; // Set your character limit here

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <p className='mt-2 text-slate-500' style={{ textAlign: 'justify' }}>
      {isTruncated ? truncateText(description, limit) : description}
      {description.length > limit && (
        <span onClick={toggleTruncate} className='text-blue-600 cursor-pointer'>
          {isTruncated ? ' Read more' : ' Show less'}
        </span>
      )}
    </p>
  );
};

const Projects = () => {
  return (
    <section className='max-container'>
      <div className='flex-col'>
        <h1 className='head-text'>
          My <span className='blue-gradient_text drop-shadow font-semibold'>Projects</span>
        </h1>
        <p className='text-slate-500 mt-1 leading-relaxed' style={{ textAlign: 'justify' }}>
          I've embarked on numerous projects throughout the years, but these are the ones I hold closest to my heart.
          Many of them are open-source, so if you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further enhancements. Your collaboration is highly valued!
        </p>
      </div>

      <div className='flex flex-wrap mb-10 mt-8 gap-16'>
        {projects.map((project, idx) => (
          <div className='relative lg:w-[400px] w-full group' key={idx}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: `.next-${idx}`,
                prevEl: `.prev-${idx}`,
              }}
              className={`swiper-container-${idx}`}
            >
              {project.img.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className='relative w-full h-[350px] overflow-hidden rounded-2xl'>
                    <img src={img} alt={`Slide ${index}`} className='object-cover scale-110 w-full h-full' />
                    <button
                      className='absolute top-1/2 -translate-y-1/2 left-3 z-10 p-2 bg-white rounded-full border-2 border-gray-300 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      style={{ aspectRatio: '1 / 1', width: '2rem' }}
                      aria-label="Previous slide"
                      onClick={() => document.querySelector(`.swiper-container-${idx}`)?.swiper.slidePrev()}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </button>
                    <button
                      className='absolute top-1/2 -translate-y-1/2 right-2 z-10 p-2 bg-white rounded-full border-2 border-gray-300 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      style={{ aspectRatio: '1 / 1', width: '2rem' }}
                      aria-label="Next slide"
                      onClick={() => document.querySelector(`.swiper-container-${idx}`)?.swiper.slideNext()}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>{project.name}</h4>
              <ProjectDescription description={project.description} />
              <div className='mt-5 flex items-center gap-2 font-poppins'>
                <Link to={project.link} target='_blank' rel='noopener noreferrer' className='font-semibold text-blue-600'>
                  Live Link
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CTA />
    </section>
  );
};

export default Projects;
