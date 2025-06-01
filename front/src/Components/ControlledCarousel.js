"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong  } from "react-icons/fa6";
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
      {/* Fade Effects */}
      <div className="fade-overlay fade-left"></div>
      <div className="fade-overlay fade-right"></div>
      
      <div className="custom-navigation">
        <span
          className="custom-arrow custom-prev-arrow"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaArrowLeftLong />
        </span>
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
      <div className="custom-navigation">
        <span
          className="custom-arrow custom-next-arrow"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaArrowRightLong />
        </span>
      </div>
    </div>
  );
};

export default ProjectCarousel;