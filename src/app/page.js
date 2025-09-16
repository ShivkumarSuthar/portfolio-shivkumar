// src/app/page.js
"use client";

import React, { useState, useEffect } from "react";
import { Box, Fade, Typography } from "@mui/material";
import HeroSection from "@/components/HeroSection";
import SocialSection from "@/components/SocialSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import AboutSection from "@/components/AboutSection";
import Projects from "@/components/ProjectSection";
import WorkPage from "@/components/WorkPage";
import MySkillsSection from "@/components/MySkillsSection";

function Page() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // useEffect(() => {
  //   const handleLoad = () => {
  //     setTimeout(() => {
  //       setLoading(false);
  //       setTimeout(() => setShowContent(true), 100);
  //     }, 2000);
  //   };

  //   if (document.readyState === 'complete') {
  //     handleLoad();
  //   } else {
  //     window.addEventListener('load', handleLoad);
  //     return () => window.removeEventListener('load', handleLoad);
  //   }
  // }, []);

  return (
    <>
      {/* Show Loading Component */}
      {/* <Fade in={loading} timeout={300}>
        <Box sx={{ display: loading ? 'block' : 'none' }}>
          <Loading
            message="Please wait, Adding some finishing touches..."
            brandName="Mr. Suthar"
            variant="minimal"
            size={50}
          />
        </Box>
      </Fade> */}

      {/* Show Main Content */}
      {/* <Fade in={showContent} timeout={500}> */}
      {/* <Box sx={{ display: showContent ? 'block' : 'none' }}> */}
      <Box className="main__content__wrapper">
        <HeroSection />
        <SocialSection />
        <ProjectCarousel />
        <AboutSection />
        {/* <MySkillsSection/> */}
        <WorkPage />
        <Projects />
      </Box>
      {/* </Fade> */}
    </>
  );
}

export default Page;
