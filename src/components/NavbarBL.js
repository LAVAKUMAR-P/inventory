import React from 'react'
import { Navbar, Nav,NavDropdown,Container,FormControl,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
function NavbarBL() {
    return (
        <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">INVENTORY MANAGEMENT</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="ms-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Link to="/register" className='L-underline L-margin'>REGISTER</Link>
        <Link to="/" className='L-underline ml-5'>LOGIN</Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default NavbarBL
