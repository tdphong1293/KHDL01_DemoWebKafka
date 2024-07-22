'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link href={"/"} className="navbar-brand">Home</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link href={"/facebook"} className="nav-link">Facebook</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href={"/youtube"} className="nav-link">Youtube</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href={"/tiktok"} className="nav-link">Tiktok</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;