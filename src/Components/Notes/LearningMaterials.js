import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Pagination } from 'react-bootstrap';
import MenuBar from '@/Components/MenuBar';
import Footer from '@/Components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function LearningMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage, setSubjectsPerPage] = useState(6); // default 6
  const startIndex = (currentPage - 1) * subjectsPerPage + 1;
  const endIndex = Math.min(currentPage * subjectsPerPage, subjects.length);

  const [totalPages, setTotalPages] = useState(1);




  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(`/api/learningMaterials?page=${currentPage}&limit=${subjectsPerPage}`);
        const json = await res.json();
        setSubjects(json.data);
        setTotalPages(json.totalPages);
      } catch (err) {
        console.error("Failed to load materials", err);
      }
    };
    fetchMaterials();
  }, [currentPage, subjectsPerPage]);


  // Update note counts for each subject
  useEffect(() => {
    const updateNoteCounts = () => {
      const updatedSubjects = subjects.map(subject => {
        const subjectNotes = localStorage.getItem(`notes_${subject.id}`) || '[]';
        const noteCount = JSON.parse(subjectNotes).length;
        return { ...subject, noteCount };
      });
      setSubjects(updatedSubjects);
    };

    if (subjects.length > 0) {
      updateNoteCounts();
    }
  }, [subjects.length]);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'bg-primary',
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      secondary: 'bg-secondary',
      danger: 'bg-danger'
    };
    return colorMap[color] || 'bg-primary';
  };

  const handleDeleteSubject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the subject!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/api/learningMaterials/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            Swal.fire("Deleted!", "The subject has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete the subject.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong.", "error");
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      <Head>
        <title>Notes Dashboard - Shivkumar Suthar</title>
        <meta name="description" content="Organize your learning notes by subject" />
      </Head>

      <Container fluid className="py-5 notes-dashboard">
        <Row className="mb-5 align-items-center">
          <Col lg={6} className="mb-3 mb-lg-0">
            <h5 className="display-5 mb-2">
              Learning material
            </h5>
            <p className="lead text-muted mb-0 text-sm">
              Organize your knowledge by subjects and topics
            </p>
          </Col>

          <Col lg={6}>
            <div className="d-flex justify-content-lg-end align-items-center gap-2">
              {/* Search input */}
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search subjects..."
                style={{ maxWidth: '220px' }}
              // onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Filter dropdown */}
              <select
                className="form-select form-select-lg"
                style={{ maxWidth: '150px' }}
              // onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="primary">Web Dev</option>
                <option value="success">DSA</option>
                <option value="info">Database</option>
                {/* Add more as needed */}
              </select>

              {/* Add button */}
              <Link href="/notes-dashboard/learning-materials/add" passHref>
                <Button variant="link" size="lg">
                  <i className="fas fa-plus me-2"></i>
                  Create New
                </Button>
              </Link>
            </div>
          </Col>
        </Row>


        <Row className="g-4">
          {subjects
            .slice((currentPage - 1) * subjectsPerPage, currentPage * subjectsPerPage)
            .map((subject) => (
              <Col key={subject.id} lg={4} md={6}>
                <Card className="subject-card h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className={`subject-icon ${getColorClass(subject.color)} me-3`}>
                        <i className="fa-solid fa-book fa-2x text-white"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">{subject.title}</h5>
                      </div>
                    </div>

                    <p className="card-text text-muted flex-grow-1">
                      {subject.description}
                    </p>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          <i className="fas fa-clock me-1"></i>
                          Updated {formatDate(subject.updatedAt )}
                        </small>
                      </div>

                      <div className="d-flex gap-2 mt-3">
                        <Link href={`/notes-dashboard/learning-materials/${subject._id}`} passHref>
                          <Button
                            variant="warning"
                            size="sm"
                            className="px-3 py-2 rounded d-flex align-items-center"
                          >
                            <i className="fas fa-folder me-2"></i>
                            Open
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          size="sm"
                          className="px-3 py-2 rounded d-flex align-items-center"
                        onClick={() => handleDeleteSubject(subject._id)}
                        >
                          <i className="fas fa-trash me-2"></i>
                          Remove
                        </Button>
                      </div>



                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        {subjects.length > 0 && (
          <div className="mt-4 p-3 rounded ">
            <div className="d-flex flex-column align-items-center gap-3">

              {/* Top: Showing info and dropdown */}
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 text-light">
                <span>
                  Showing <strong>{startIndex + 1}</strong> – <strong>{Math.min(endIndex, subjects.length)}</strong> of <strong>{subjects.length}</strong>
                </span>
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="perPage" className="mb-0">Items per page:</label>
                  <select
                    id="perPage"
                    className="form-select form-select-sm bg-dark text-light border-secondary"
                    style={{ width: 'auto' }}
                    value={subjectsPerPage}
                    onChange={(e) => {
                      setSubjectsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {Array.from({ length: Math.ceil(subjects.length / 6) }, (_, i) => (i + 1) * 6)
                      .map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Bottom: Pagination */}
              <Pagination size="sm" className="mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                />
                {[...Array(totalPages).keys()].map(num => (
                  <Pagination.Item
                    key={num + 1}
                    active={num + 1 === currentPage}
                    onClick={() => setCurrentPage(num + 1)}
                  >
                    {num + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                />
              </Pagination>

            </div>
          </div>
        )}

        {subjects.length === 0 && (
          <Row>
            <Col>
              <div className="text-center py-5">
                <i className="fas fa-book-open fa-4x text-muted mb-4"></i>
                <h3 className="text-muted">No learning materials yet</h3>
                <p className="text-muted mb-4">Start by adding your first learning subject</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
