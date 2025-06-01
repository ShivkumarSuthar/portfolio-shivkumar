import { data } from '@/data/constant';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function WorkPage() {
    return (
        <div className="work__page__wrapper">
                <Row>
                    <Col>
                        <h1 className="text-title-end">Work Profiles</h1>
                    </Col>
                </Row>

                {data.experience.jobs.length > 0 &&
                    data.experience.jobs.map((job, index) => (
                        <Row key={index} className="job__box">
                            <Col md={3} xs={12} className="work-section section1">
                                <p className="job__year">{job.duration}</p>
                                <p className="job__period">{job.period}</p>
                            </Col>
                            <Col md={9} xs={12} className="work-section section2">
                                <h5 className="text-company">{job.company}</h5>
                                <div className="job__description">
                                    <p className="job__profil mb-0">{job.role}</p>
                                    <span className="tech-separator"> | </span>
                                    <p className="job__tech mb-0">{job.tech}</p>
                                </div>
                            </Col>
                        </Row>
                    ))
                }

                <Row>
                    <Col className="job__experience job__experience__div text-end">
                        <h2>Work Experience</h2>
                        <p className="experience__no">{data.experience.total}</p>
                    </Col>
                </Row>
        </div>
    );
}

export default WorkPage;
