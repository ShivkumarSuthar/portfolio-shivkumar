import { data } from '@/data/constant'
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AboutSection() {
    return (
        <div className='about__page__wrapper'>
            <Row>
                <Col md={7} lg={12}>
                    <Row>
                        {/* <Col lg={3}> */}
                            <p className='page__title__text'>../About me...</p>
                        {/* </Col> */}
                        {/* <Col lg={9}> */}
                            <div className='page__heading__text'>
                                {/* <p> */}
                                    I'm Shivkumar Suthar, a MERN Stack Developer at Dev Technosys, specializing in dynamic, scalable, and high-performance web app with expertise in JavaScript, React, and Node.js. At Dev Technosys, a CMMI Level 3 certified IT services company, I transform client requirements into innovative solutions that meet the needs of businesses globally.
                                {/* </p> */}
                            </div>



                        {/* </Col> */}
                    </Row>
                </Col>
                <Col lg={5} md={5} sm={12} className='desktop__d__none'>
                    <div className='me__profile__div'>
                        <Image src={data.profile__image} alt={'shivkumar suthar'} width='100' height='100' />
                    </div>
                </Col>

            </Row>
            <Row className='about__section__bottom'>
                <Col lg={7} sm={12} className='order-2 order-md-1'>
                    <Row>
                        <Col md={12}>
                            <div className='skills__frontend skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[0]}</p>
                                <div className='skills__list'>
                                    {data.skills['Front-end'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={9} xs={7} sm={10}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[1]}</p>
                                <div className='skills__list'>
                                    {data.skills['Styles'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='git__btn__div'>
                                <button className="btn git__btn">
                                    <i className="fa-brands fa-github-alt"></i>
                                </button>
                                <button className="btn arrow__btn">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[2]}</p>
                                <div className='skills__list'>
                                    {data.skills['Programming Languages'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[3]}</p>
                                <div className='skills__list'>
                                    {data.skills['Design'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[4]}</p>
                                <div className='skills__list'>
                                    {data.skills['Tools'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        
                        <Col lg={4}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[5]}</p>
                                <div className='skills__list'>
                                    {data.skills['Databases'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='skill__description'>
                                Duis do elit mollit consequat aliqua culpa laborum commodo consectetur voluptate nulla ad exercitation Lorem.
                            </div>
                        </Col>
                        <Col lg={12} sm={12} md={12} xs={12}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[6]}</p>
                                <div className='skills__list'>
                                    {data.skills['Deployment'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5} sm={12} className='order-1 order-md-2 mobile__d__none me__profile__div'>
                    {/* <div className='me__profile__div' style={{background:"#333"}}> */}
                        {/* <Image src={data.profile__image} alt={'shivkumar suthar'} width='100' height='100' /> */}
                        {/* <div className='w-100' style={{background:"#333"}}></div> */}
                    {/* </div> */}
                </Col>
            </Row>
        </div>
    )
}

export default AboutSection
