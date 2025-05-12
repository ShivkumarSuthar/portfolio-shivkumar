import { data } from '@/data/constant'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Projects() {
  return (
    <div className='projects__wrapper'>
      <h3 className='page__title__text'>.../Projects...</h3>
      <p className='projects__intro'>
        "These projects were created during my free time before joining the professional world. They reflect my passion for coding and my desire to learn and experiment with new technologies. Each project is a testament to my self-driven initiative and enthusiasm for building scalable and functional applications."
      </p>
      
      <Row className='projects__grid'>
        {data.projects.map((project, index) => (
          <Col lg={6} md={6} sm={12} key={index} className='project__item__wrapper'>
            <div className='project__item'>
              <div className='project__image__container'>
                <iframe
                  src={project.liveLink}
                  title={project.title}
                  className='project__iframe'
                  frameBorder="0"
                  loading="lazy"
                ></iframe>

                
                <div className='project__overlay'>
                  <h3 className='project__title__text'>{project.title}</h3>
                  <div className='project__tech__list'>
                    {project.tech.map((tech, index2) => (
                      <span className='project__tech' key={index2}>{tech}</span>
                    ))}
                  </div>
                  <p className='project__description__text'>{project.description}</p>
                  <div className='project__links'>
                    <button className="btn git__btn">
                      <i className="fa-brands fa-github-alt"></i>
                    </button>
                    <button className="btn arrow__btn">
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Projects