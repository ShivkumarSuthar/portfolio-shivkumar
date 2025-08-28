import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import MenuBar from '@/Components/MenuBar';
import Footer from '@/Components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function LearningMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage, setSubjectsPerPage] = useState(6); 
  // Handle search with debouncing to avoid too many API calls
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle filter change
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch materials with proper error handling and loading state
  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      // Include search and filter params in API call for server-side filtering
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: subjectsPerPage.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(filter && { filter: filter })
      });
      
      const res = await fetch(`/api/learningMaterials?${params}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      
      console.log('API Response:', json); // Debug log
      
      // Ensure we have valid data structure
      if (json && Array.isArray(json.data)) {
        setSubjects(json.data);
        setTotalPages(json.totalPages || 1);
        setTotalData(json.totalItems || 0);
      } else {
        console.warn('Invalid data structure received:', json);
        setSubjects([]);
        setTotalPages(1);
        setTotalData(0);
      }
    } catch (err) {
      console.error("Failed to load materials", err);
      // Show user-friendly error message
      Swal.fire({
        title: 'Error',
        text: 'Failed to load learning materials. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, subjectsPerPage, debouncedSearchQuery, filter]);

  // Initial fetch and when dependencies change
  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  // Since we're doing server-side pagination, we don't need client-side filtering
  // The subjects array is already the filtered and paginated result from the server
  const displaySubjects = useMemo(() => {
    if (!Array.isArray(subjects)) return [];
    return subjects;
  }, [subjects]);

  // Memoized pagination calculations based on server response
  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * subjectsPerPage;
    const endIndex = Math.min(startIndex + displaySubjects.length, startIndex + subjectsPerPage);
    
    return {
      startIndex,
      endIndex,
      totalFilteredPages: totalPages,
      currentSubjects: displaySubjects // Use subjects directly as they're already paginated
    };
  }, [displaySubjects, currentPage, subjectsPerPage, totalPages]);

  // If you want to populate the filter dropdown, you should fetch available filters from the server
  // For now, I'll remove the unique subjects logic and use a simple predefined list

  // Format date function
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  }, []);

  // Get color class function
  const getColorClass = useCallback((color) => {
    const colorMap = {
      primary: 'bg-primary',
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      secondary: 'bg-secondary',
      danger: 'bg-danger'
    };
    return colorMap[color] || 'bg-primary';
  }, []);

  // Handle delete subject
  const handleDeleteSubject = useCallback(async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the subject!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/learningMaterials/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire("Deleted!", "The subject has been deleted.", "success");
          // Remove from local state
          setSubjects(prev => prev.filter(s => s._id !== id));
          // If current page becomes empty, go to previous page
          if (paginationData.currentSubjects.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
          }
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error(error);
        await Swal.fire("Error", "Failed to delete the subject.", "error");
      }
    }
  }, [paginationData.currentSubjects.length, currentPage]);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((e) => {
    setSubjectsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  }, []);

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = [];
    const totalPages = Math.ceil(totalData / subjectsPerPage);
    
    // Show max 5 pages at a time
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    
    return items;
  }, [currentPage, totalData, subjectsPerPage, handlePageChange]);

  return (
    <>
      <Head>
        <title>Notes Dashboard - Shivkumar Suthar</title>
        <meta name="description" content="Organize your learning notes by subject" />
      </Head>

      <Container fluid className="py-5 notes-dashboard learning-material-wrapper">
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
                style={{ maxWidth: '220px', height: '40px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Filter dropdown */}
              <select
                className="form-select form-select-lg"
                style={{ maxWidth: '150px', height: "46px" }}
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="">All</option>
                {/* You should fetch filter options from your API */}
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="mathematics">Mathematics</option>
              </select>

              {/* Add button */}
              <Link href="/notes-dashboard/learning-materials/add" passHref>
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-2 px-4 shadow-sm"
                  style={{ height: "43px" }}
                >
                  <i className="fas fa-plus"></i>
                  <span>Create New</span>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* Loading state */}
        {loading && (
          <Row>
            <Col className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading materials...</p>
            </Col>
          </Row>
        )}

        {/* Content */}
        {!loading && (
          <>
            <Row className="g-4">
              {paginationData.currentSubjects.map((subject) => (
                <Col key={subject._id} lg={4} md={6}>
                  <Card className="subject-card h-100">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <div className={`subject-icon ${getColorClass(subject.color)} me-3`}>
                          <i className="fa-solid fa-book fa-2x text-white"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">{subject.title || 'Untitled'}</h5>
                        </div>
                      </div>

                      <p className="card-text text-muted flex-grow-1">
                        {subject.description || 'No description available'}
                      </p>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <small className="text-muted">
                            <i className="fas fa-clock me-1"></i>
                            Updated {formatDate(subject.updatedAt)}
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

            {/* Pagination - only show if we have data */}
            {displaySubjects.length > 0 && totalPages > 1 && (
              <div className="mt-4 p-3 rounded">
                <div className="d-flex flex-column align-items-center gap-3">
                  {/* Top: Showing info and dropdown */}
                  <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 text-light">
                    <span>
                      Showing <strong>{paginationData.startIndex + 1}</strong> – <strong>{paginationData.endIndex}</strong> of <strong>{totalData}</strong>
                    </span>
                    <div className="d-flex align-items-center gap-2">
                      <label htmlFor="perPage" className="mb-0">Items per page:</label>
                      <select
                        id="perPage"
                        className="form-select form-select-sm bg-dark text-light border-secondary"
                        style={{ width: 'auto' }}
                        value={subjectsPerPage}
                        onChange={handleItemsPerPageChange}
                      >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={18}>18</option>
                        <option value={24}>24</option>
                      </select>
                    </div>
                  </div>

                  {/* Bottom: Pagination */}
                  {Math.ceil(totalData / subjectsPerPage) > 1 && (
                    <Pagination size="sm" className="mb-0">
                      <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      />
                      {paginationItems}
                      <Pagination.Next
                        disabled={currentPage === Math.ceil(totalData / subjectsPerPage)}
                        onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(totalData / subjectsPerPage)))}
                      />
                    </Pagination>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {displaySubjects.length === 0 && !loading && (
              <Row>
                <Col>
                  <div className="text-center py-5">
                    <i className="fas fa-book-open fa-4x text-muted mb-4"></i>
                    <h3 className="text-muted">No learning materials found</h3>
                    <p className="text-muted mb-4">
                      {debouncedSearchQuery || filter ? 
                        'Try changing your search or filter' : 
                        'Get started by creating your first learning material'
                      }
                    </p>
                    {!debouncedSearchQuery && !filter && (
                      <Link href="/notes-dashboard/learning-materials/add" passHref>
                        <Button variant="primary">
                          <i className="fas fa-plus me-2"></i>
                          Create First Material
                        </Button>
                      </Link>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
}