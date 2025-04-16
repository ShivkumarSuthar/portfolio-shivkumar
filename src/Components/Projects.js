import { data } from '@/data/constant'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Projects() {
    return (
        <div className='projects__wrapper'>
            <h3 className='page__title__text'>.../Projects ...</h3>
            {data.projects.map((project, index) => <Row className='project__inner__wrapper'>
                <Col
                    lg={6} md={6}
                    className={` ${index % 2 === 0 ? 'order-lg-1 order-md-1' : 'order-lg-2 order-md-2'
                        }`}>                    <div className='project__container'>
                        <h3 className='project__title__text'>{project.title}</h3>
                        <div className='project__tech__list'>
                            {project.tech.map((tech, index2) => <span className='project__tech' key={index2}>{tech}</span>)}
                        </div>
                        <p className='project__description__text'>{project.description}</p>
                        <div className='git__btn__div'>
                            <button class="btn git__btn">
                                <i class="fa-brands fa-github-alt"></i>
                            </button>
                            <button class="btn arrow__btn">
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </Col>
                <Col lg={6} md={6} className={`${index % 2 === 0 ? 'order-lg-2 order-md-2' : 'order-lg-1 order-md-1'}`}>
                    <img src={project.image} alt='project' className='project__image' width='100%' height='100%' />
                </Col>
            </Row>)}
        </div>
    )
}

export default Projects
