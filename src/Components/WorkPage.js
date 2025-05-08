import { data } from '@/data/constant'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function WorkPage() {
    return (
        <div fluid className='work__page__wrapper'>
            <Row>
                {/* <Col xs={12}> */}
                    <h1 className="text-end mb-3 pe-12">Work Profiles</h1>
                {/* </Col> */}
            </Row>

            {data.experience.jobs.length > 0 &&
                data.experience.jobs.map((job, index) => (
                    <Row key={index} className="job__box">
                        <Col lg={3}>
                            <div className="job-container">
                                <p className='job__year'>{job.duration}</p>
                                <p className='job__period'>{job.period}</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <p className="fw-bold">{job.company}</p>
                        </Col>
                        <Col lg={6}>
                            <div className='job__description d-flex gap-2'>
                                <p className='job__profil mb-0'>{job.role}</p> |
                                <p className='job__tech mb-0'>{job.tech}</p>
                            </div>
                        </Col>
                    </Row>
                ))
            }
            <Row className='job__exerience text-end'>
                {/* <Col lg={11}> */}
                    <div className='job__exerience__div my-3'>
                        <h1>Work Experience</h1>
                        <p className='experience__no'>{data.experience.total}</p>
                    </div>
                {/* </Col> */}
            </Row>
        </div>
    )
}

export default WorkPage
