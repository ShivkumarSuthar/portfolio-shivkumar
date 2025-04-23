import { data } from '@/data/constant'
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AboutSection() {
    return (
        <div className='about__page__wrapper'>
            <Row>
                <Col md={7}>
                    <Row>
                        <Col lg={4}>
                            <p className='page__title__text'>../About me ...</p>
                        </Col>
                        <Col lg={7}>
                            <p className='page__heading__text'>
                                My name is Shivkumar Suthar. I'm a software engineer and aspiring artist. I have been working remotely for the past five years.
                            </p>
                        </Col>
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
                        <Col lg={12}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[2]}</p>
                                <div className='skills__list'>
                                    {data.skills['Back-end'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='skill__description'>
                                Duis do elit mollit consequat aliqua culpa laborum commodo consectetur voluptate nulla ad exercitation Lorem.
                            </div>
                        </Col>
                        <Col lg={5} sm={6} md={6} xs={6}>
                            <div className='skills__others skill__div'>
                                <p className='skills__title__text'>{Object.keys(data.skills)[3]}</p>
                                <div className='skills__list'>
                                    {data.skills['DevOps'].join(' / ')}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5} sm={12} className='order-1 order-md-2 mobile__d__none'>
                    <div className='me__profile__div'>
                        <Image src={data.profile__image} alt={'shivkumar suthar'} width='100' height='100' />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AboutSection
