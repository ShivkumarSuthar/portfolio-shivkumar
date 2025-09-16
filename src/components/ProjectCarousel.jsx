"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { IconButton, Box, Typography, Button } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { data } from "@/data/constant";

const ProjectCarousel = () => {
  const projects = [...data.PROJECT_CAROUSEL, ...data.PROJECT_CAROUSEL];
  const swiperRef = useRef(null);

  return (
    <Box
  sx={{
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    width: "100%",
    height: { xs: "90vh", sm: "360px", md: "290px" },
    display: "flex",
    justifyContent: "center",
    px: { xs: 1, sm: 2, md: 4 },
    ".swiper-pagination": {
      position: { xs: "relative", sm: "absolute" }, // mobile: below slides
      bottom: { xs: 0, sm: 0 },
      marginTop: { xs: 2, sm: 0 }, // add space below slides on mobile
      left: "50%",
      transform: { xs: "translateX(-50%)", sm: "translateX(-50%)" },
      zIndex: 100,
      display: "flex",
      justifyContent: "center",
      "& .swiper-pagination-bullet": {
        background: (theme) => theme.palette.primary.main,
        opacity: 0.5,
        height: 10,
        width: 10,
        margin: "0 6px",
        transition: "opacity 0.3s",
        "&.swiper-pagination-bullet-active": {
          opacity: 1,
        },
      },
    },
  }}
>

      {/* Fade Effects */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: { xs: 50, sm: 100, md: 200 },
          background: (theme) =>
            `linear-gradient(to right, ${theme.palette.background.default} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: { xs: 50, sm: 100, md: 200 },
          background: (theme) =>
            `linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Prev Arrow */}
      <IconButton
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          position: "absolute",
          top: { xs: "30%", sm: "50%" },
          left: { xs: "12px", sm: "10px" },
          transform: "translateY(-50%)",
          zIndex: 1000,
          bgcolor: "background.paper",
          borderRadius: "50%",
          p: { xs: 1, sm: 1.5 },
          boxShadow: 2,
        }}
      >
        <ArrowBackIosNew fontSize="small" />
      </IconButton>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={15}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        style={{ width: "100%", height: "100%", padding: "0px 0" }}
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "100%",
              maxWidth: "500px",
              height: { xs: "90vh", sm: "360px", md: "290px" },
              borderRadius: 20,
              overflow: "hidden",
              flexShrink: 0,
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            {/* Background Image */}
            <Box
              component="img"
              src={project.image}
              alt={project.title}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />

            {/* Dark overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.4)",
                zIndex: 1,
              }}
            />

            {/* Content container */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "100%",
                flexDirection: { xs: "column", md: "row" },
                p: 0,
              }}
            >
              {/* Right Side Text Box */}
              <Box
                sx={(theme) => ({
                  width: { xs: "100%", md: "70%" },
                  height: { xs: "40%", md: "100%" },
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: theme.palette.common.white,
                  borderRadius: 0,
                  p: { xs: 2, md: 3 },
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                })}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    mb: { xs: 1, md: 2 },
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  }}
                >
                  {project.description}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "100vmax",
                    fontWeight: 500,
                    textTransform: "none",
                    px: { xs: 2, md: 3 },
                    py: { xs: 0.5, md: 1 },
                    fontSize: { xs: "12px", md: "16px" },
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                    alignSelf: { xs: "flex-start", md: "flex-start" },
                  }}
                >
                  Read more →
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Next Arrow */}
      <IconButton
        onClick={() => swiperRef.current?.slideNext()}
        sx={{
          position: "absolute",
          top: { xs: "30%", sm: "50%" },
          right: { xs: "12px", sm: "10px" },
          transform: "translateY(-50%)",
          zIndex: 1000,
          bgcolor: "background.paper",
          borderRadius: "50%",
          p: { xs: 1, sm: 1.5 },
          boxShadow: 2,
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ProjectCarousel;
