import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ControlledCarousel from './ControlledCarousel'

function HeroSection() {
  return (
    <div className='hero__section__wrapper'>
      <Row>
        {/* Mern-stack title */}
        <Col lg={7} md={7} className="order-1">
          <p className='me__profile__title__text1'>Mern-stack</p>
        </Col>

        {/* Developer title */}
        <Col lg={6} md={6} className="order-2 order-lg-4 order-md-4">
          <p className='me__profile__title__text2'>Developer</p>
        </Col>

        {/* Projects button */}
        <Col className='project__btn order-4 order-lg-2 order-md-2'>
          <div className='hero__project__container d-flex'>
            <span className='btn btn__project'>Projects</span>
            <Button className='btn__project__btn'>
              <i className="fa-solid fa-arrow-right-long"></i>
            </Button>
          </div>
        </Col>

        {/* Goal text */}
        <Col lg={6} md={6} className="order-3 order-lg-3 ">
          <div className='hero__section__goal__text'>
            Cupidatat mollit et incididunt anim nisi velit reprehenderit. Sunt sunt officia ea eu minim dolor excepteur mollit mollit laboris reprehenderit cupidatat ea.
          </div>
        </Col>

        {/* Social links */}
        <Col lg={11} md={12} className='mx-auto order-5 social__items'>
          <div className='social__btn'>
            <div className='group group-2'>
              <button className="btn btn__social">
                <i className="fab fa-github"></i><span className="d-none d-sm-inline">github</span> 
              </button>
              <button className="btn btn__social">
                <i className="fab fa-linkedin-in"></i> <span className="d-none d-sm-inline">linkedin</span>
              </button>
            </div>
            <div className='group group-1'>
              <button className="btn btn__social">
                <i className="fas fa-code"></i> <span className="d-none d-sm-inline">LeetCode</span>
              </button>
            </div>
            <div className='group group-2'>
              <button className="btn btn__social">
                <i className="fab fa-facebook-f"></i> <span className="d-none d-sm-inline">facebook</span>
              </button>
              <button className="btn btn__social">
                <i className="fab fa-instagram"></i> <span className="d-none d-sm-inline">instagram</span>

              </button></div>
          </div>
        </Col>
        <Col className='order-5'>

          <ControlledCarousel />
        </Col>

        {/* Carousel section */}
      </Row>
    </div>
  )
}

export default HeroSection
