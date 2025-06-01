import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function MenuBar() {
  return (
    <Navbar expand="lg" className="main-navbar" variant="dark">
      <Container fluid className="p-0 d-flex justify-content-between align-items-center">
        {/* Brand on the left */}
        <Navbar.Brand href="/" className="brand" title='Shivkumar Suthar'>Mr. Suthar</Navbar.Brand>

        {/* Connect Button on the right */}
        <div>
          <a href="tel:+919876543210" className="contact-btn">
            Let’s Connect Now
          </a>
        </div>
      </Container>
    </Navbar>
  );
}

export default MenuBar;