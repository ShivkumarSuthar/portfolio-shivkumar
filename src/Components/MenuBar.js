import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function MenuBar() {
  const pathname = usePathname();
  const isLearningMaterial = pathname.includes("learning-materials/list");
  return (
    <Navbar expand="lg" className="main-navbar" variant="dark">
      <Container fluid className="p-0 d-flex justify-content-between align-items-center">
        {/* Brand on the left */}
        <Navbar.Brand href="/" className="brand" title='Shivkumar Suthar'>Mr. Suthar</Navbar.Brand>

        {/* Navigation links in the center */}

        {/* Connect Button on the right */}
        <Nav className="ms-auto d-flex flex-row">
          <Link
            href={isLearningMaterial ? "/" : "/notes-dashboard/learning-materials/list"}
            className="nav-link contact-btn"
            title="Learning Materials"
          >
            <i className={isLearningMaterial ? "fas fa-home" : "fas fa-graduation-cap"}></i>
          </Link>
          <Link
            href="tel:+919876543210"
            className="nav-link contact-btn"
            title="Let's Connect Now"
          >
            <i className="fas fa-phone-alt"></i>
          </Link>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default MenuBar;