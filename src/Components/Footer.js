import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Footer() {
    return (
        <footer className='footer__wrapper'>

            {/* Row 1: Contact section shown first on mobile */}
            <Row>
                {/* Contacts column - shown first on mobile */}
                <Col lg={4} md={5} sm={12} className="order-1 order-sm-1 order-md-2">
                    <h3 className='page__title__text mt-3'>.../Contacts ...</h3>

                    <Row className='page__link'>
                        <Col>
                            <div className='page__link__list'>
                                <span className='page__link1'>main</span>
                                <span className='page__link2'>About</span>
                                <span className='page__link3'>Project</span>
                                <span className='page__link4'>skills</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="site__list">
                        <h5>Site</h5>
                        <p>
                            <a href="https://your-site.com" target="_blank" rel="noopener noreferrer">
                                Handcrafted by <span>ME</span> /
                            </a>
                        </p>
                        <p>
                            <a href="https://taisia-portfolio.com" target="_blank" rel="noopener noreferrer">
                                Designed by <span>Taisia</span> /
                            </a>
                        </p>
                        <p>
                            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                                Powered by <span>NextJs</span>
                            </a>
                        </p>
                    </div>
                </Col>

                {/* Name & Role column - shown second on mobile */}
                <Col lg={7} md={7} sm={12} className="order-2 order-sm-2 order-md-1">
                    <Row>
                        <Col>
                            <p className='brand__text__1'>Shivkumar</p>
                        </Col>
                        <Col lg={4} md={5} xs={4} sm={6}>
                            <div className='d-flex flex-column profile__text'>
                                <span className='profile__text__1'>Mern-stack</span>
                                <span className='profile__text__2'>Developer</span>
                            </div>
                        </Col>
                        <Col lg={8} md={7} xs={8} sm={6}>
                            <p className='brand__text__2'>Suthar</p>
                        </Col>
                    </Row>
                    <Row>
                    <Col lg={12} className='mx-auto my-3'>
                    <div className='social__btn'>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn__social">
                                <i className="fab fa-linkedin-in"></i>
                            </button>
                        </a>
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn__social">
                                <i className="fab fa-github"></i>
                            </button>
                        </a>
                        <a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn__social">
                                <i className="fas fa-code"></i>
                            </button>
                        </a>
                        <a href="mailto:youremail@example.com">
                            <button className="btn btn__social">
                                <i className="fas fa-envelope"></i>
                            </button>
                        </a>
                        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn__social">
                                <i className="fab fa-instagram"></i>
                            </button>
                        </a>
                        {/* <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn__social">
                                <i className="fab fa-youtube"></i>
                            </button>
                        </a> */}
                    </div>
                </Col>
                    </Row>
                </Col>
            </Row>

        </footer>
    );
}

export default Footer;
