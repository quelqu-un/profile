import React, { useRef } from 'react';
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

const Projects = () => {
  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>
      <p className='text-slate-500 mt-1 leading-relaxed' style={{ textAlign: 'justify' }}>
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. Many of them are open-source, so if
        you come across something that piques your interest, feel free to
        explore the codebase and contribute your ideas for further enhancements.
        Your collaboration is highly valued!
      </p>

      <div className='flex flex-wrap mb-10 mt-8 gap-16'>
        {projects.map((project, idx) => (
          <div className='lg:w-[400px] w-full relative group' key={idx}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: `.next-${idx}`,
                prevEl: `.prev-${idx}`,
              }}
              className="swiper-container"
            >
              {project.img.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Slide ${index}`} className='relative w-full h-[250px] object-cover rounded-2xl' />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className={cn(activeStyles, 'prev-' + idx, 'absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-opacity', {
              'opacity-0 group-hover:opacity-100': true,
              'active:scale-[0.97] hover:scale-105': true
            })}
              style={{ aspectRatio: '1 / 1', width: '2rem' }} // Ensure aspect ratio and size
            >
              <ChevronLeft className='h-4 w-4 text-zinc-700' />{' '}
            </button>
            <button className={cn(activeStyles, 'next-' + idx, 'absolute right-3 top-1/2 -translate-y-1/2 z-10 transition-opacity', {
              'opacity-0 group-hover:opacity-100': true,
              'active:scale-[0.97] hover:scale-105': true
            })}
              style={{ aspectRatio: '1 / 1', width: '2rem' }} // Ensure aspect ratio and size
            >
              <ChevronRight className='h-4 w-4 text-zinc-700' />{' '}
            </button>

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