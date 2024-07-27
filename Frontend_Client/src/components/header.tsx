'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import  '../styles/page.module.css';

function Header() {
    return (
        <Navbar expand="lg" className="fixed-top shadow-sm" style={{backgroundColor: '#fcfde9'}}>
            <Container>
                <Navbar.Brand>
                    <Link href={"/home"} className="navbar-brand">
                        <img src="/assets/logo.png" alt="logo"  width="160px" height="53px"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Các liên kết khác nếu có */}
                    </Nav>
                    <Nav className="ms-auto"> {/* Đặt các liên kết ở góc phải */}
                        <Nav.Item>
                            <Link href={"/auth/login"} className="nav-link">Login</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link href={"/auth/signup"} className="nav-link">Register</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;