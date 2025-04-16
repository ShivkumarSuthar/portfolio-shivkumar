import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';

function MenuBar() {
  return (
    <Navbar expand="lg" className="main-navbar" variant="dark">
      <Container fluid className='p-0'>
        {/* Brand on the left */}
        <Navbar.Brand href="/" className="brand">Mr. Suthar</Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        {/* Desktop: Nav Center + Button Right */}
        <Navbar.Collapse id="navbar-content" className="d-none d-lg-flex">
        {/* Center Menu */}
          <Nav className="mx-auto text-center">
            <Nav.Link href="#home"><i className="fas fa-home me-2"></i>Home</Nav.Link>
            <Nav.Link href="#about"><i className="fas fa-user me-2"></i>About</Nav.Link>

            <NavDropdown title={<><i className="fas fa-layer-group me-2"></i>Projects</>} id="projects-dropdown">
              <NavDropdown.Item href="#web-projects">
                <i className="fas fa-code me-2"></i>Web Projects
              </NavDropdown.Item>
              <NavDropdown.Item href="#mobile-projects">
                <i className="fas fa-mobile-alt me-2"></i>Mobile Apps
              </NavDropdown.Item>
              <NavDropdown.Item href="#uiux-projects">
                <i className="fas fa-pencil-ruler me-2"></i>UI/UX Designs
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#skills"><i className="fas fa-tools me-2"></i>Skills</Nav.Link>
            <Nav.Link href="#contact"><i className="fas fa-envelope me-2"></i>Contact</Nav.Link>
          </Nav>

          {/* Connect Button on the Right */}
          <div className="d-none d-lg-block text-lg-end">
            <a href="tel:+919876543210" className="contact-btn">
              Let’s Connect Now
            </a>
          </div>
        </Navbar.Collapse>

        {/* Offcanvas for Mobile */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
           className="offcanvas-bg d-lg-none"
        >
          <Offcanvas.Header closeButton className="offcanvas-header-custom">
            <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column justify-content-between">
            <Nav className="flex-column">
              <Nav.Link href="#home"><i className="fas fa-home me-2"></i>Home</Nav.Link>
              <Nav.Link href="#about"><i className="fas fa-user me-2"></i>About</Nav.Link>

              <NavDropdown title={<><i className="fas fa-layer-group me-2"></i>Projects</>} id="projects-dropdown">
                <NavDropdown.Item href="#web-projects">
                  <i className="fas fa-code me-2"></i>Web Projects
                </NavDropdown.Item>
                <NavDropdown.Item href="#mobile-projects">
                  <i className="fas fa-mobile-alt me-2"></i>Mobile Apps
                </NavDropdown.Item>
                <NavDropdown.Item href="#uiux-projects">
                  <i className="fas fa-pencil-ruler me-2"></i>UI/UX Designs
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#skills"><i className="fas fa-tools me-2"></i>Skills</Nav.Link>
              <Nav.Link href="#contact"><i className="fas fa-envelope me-2"></i>Contact</Nav.Link>
            </Nav>

            {/* Bottom Connect & Social */}
            <div className="mt-4 d-lg-none">
              <a href="tel:+919876543210" className="contact-btn w-100 d-block text-center mb-3">
                Let’s Connect Now
              </a>
              <div className="social-icons text-center">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
