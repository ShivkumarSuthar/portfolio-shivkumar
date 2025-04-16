"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { data } from "@/data/constant";
// Make sure you've imported Font Awesome in your project
// This is typically done in a _app.js or layout.js file

const ProjectCarousel = () => {
  const projects = [...data.PROJECT_CAROUSEL, ...data.PROJECT_CAROUSEL]; // duplicate to fake infinite feel
  const swiperRef = useRef(null);
  
  return (
    <div className="carousel-wrapper relative">
      <div className="custom-navigation absolute w-full top-1/2 -translate-y-1/2 flex justify-between px-4 z-10 pointer-events-none">
        <button
          className="custom-prev-arrow bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md pointer-events-auto"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <button
          className="custom-next-arrow bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md pointer-events-auto"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="swiper-container"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="card">
              <div className="image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-image"
                />
              </div>
              <div className="overlay">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="read-btn">
                  Read more <span>→</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectCarousel;