import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ControlledCarousel from './ControlledCarousel'
import SocialSection from './SocialSection'
import { MdArrowOutward } from "react-icons/md";

function HeroSection() {
  return (
    <>
      <div className='hero__section__wrapper'>
        <Row>
          {/* Mern-stack title */}
          <Col lg={6} md={7} className="order-1">
            <p className='me__profile__title__text1'>Mern-stack</p>
          </Col>

          {/* Developer title */}
          <Col lg={6} md={6} className="order-2 order-lg-4 order-md-4">
            <p className='me__profile__title__text2 text-end'>Developer</p>
          </Col>

          {/* Projects button */}
          <Col className='order-4 order-lg-2 order-md-2'>
            <div className='hero__project__container d-flex'>
              <div className='live__text'>
                <p>Code. Deploy. Repeat.</p>
                <div className='button__live__box'>
                  <p>Check out the latest in motion</p>
                  <Button className='btn__project__btn'>
                  <MdArrowOutward />
                  </Button>
                </div>
              </div>

            </div>
          </Col>

          {/* Goal text */}
          <Col lg={6} md={6} className="order-3 order-lg-3 ">
            <div className='hero__section__goal__text'>My goal is to <span className='text-light'>create, maintainable, clean</span> and <span className='text-light'>understandable code</span> to process development was enjoyable.</div>
          </Col>

          {/* Social links */}
          <SocialSection />
          {/* Carousel section */}
          <Col className='order-5'>
            <ControlledCarousel />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default HeroSection
