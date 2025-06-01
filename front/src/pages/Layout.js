import AboutSection from '@/Components/AboutSection'
import HeroSection from '@/Components/HeroSection'
import Projects from '@/Components/Projects'
import WorkPage from '@/Components/WorkPage'
import React from 'react'
import { Container } from 'react-bootstrap'

function Layout() {
  return (
    <Container fluid className='layout__wrapper p-0'>
      <HeroSection />
      <AboutSection />
      <WorkPage/>
      <Projects/>
    </Container>
  )
}

export default Layout
