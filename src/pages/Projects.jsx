import React from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import CTA from "../components/CTA";
import { projects } from "../constants"; 


const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>
      <p className='text-slate-500 mt-2 leading-relaxed' style={{ textAlign: 'justify' }}>
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. Many of them are open-source...
      </p>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {project.img.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Slide ${index}`} className='w-full h-full object-cover rounded-2xl' />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>{project.name}</h4>
              <p className='mt-2 text-slate-500' style={{ textAlign: 'justify' }}>{project.description}</p>
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
