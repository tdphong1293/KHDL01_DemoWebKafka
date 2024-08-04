'use client'

import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import '../styles/page.module.css';

function Header() {
    const router = useRouter();

    var token: string | null = "";

    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.refresh();
    }

    if (token) {
        return (
            <Navbar expand="lg" className="fixed-top shadow-sm" style={{ backgroundColor: '#fcfde9' }}>
                <Container>
                    <Navbar.Brand>
                        <Link href={"/home"} className="navbar-brand">
                            <img src="/assets/logo.png" alt="logo" width="160px" height="53px" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Các liên kết khác nếu có */}
                        </Nav>
                        <Nav className="ms-auto"> {/* Đặt các liên kết ở góc phải */}
                            <Nav.Item>
                                <Button style={{ backgroundColor: '#352104', borderColor: '#352104', fontWeight: 'bold', width: '125.85px', marginRight: '10px' }}>
                                    <Link href={"/admin"} className="nav-link" style={{ color: '#fbd800' }}>Dashboard</Link>
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={handleLogout} style={{ backgroundColor: '#fbd800', borderColor: '#fbd800', fontWeight: 'bold' }}>
                                    <div className="nav-link" style={{ color: '#352104' }}>Đăng xuất</div>
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    return (
        <Navbar expand="lg" className="fixed-top shadow-sm" style={{ backgroundColor: '#fcfde9' }}>
            <Container>
                <Navbar.Brand>
                    <Link href={"/home"} className="navbar-brand">
                        <img src="/assets/logo.png" alt="logo" width="160px" height="53px" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Các liên kết khác nếu có */}
                    </Nav>
                    <Nav className="ms-auto"> {/* Đặt các liên kết ở góc phải */}
                        <Nav.Item>
                            <Button style={{ backgroundColor: '#fbd800', borderColor: '#fbd800', fontWeight: 'bold', marginRight: '10px' }}>
                                <Link href={"/auth/login"} className="nav-link" style={{ color: '#352104' }}>Đăng nhập</Link>
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button style={{ backgroundColor: '#352104', borderColor: '#352104', fontWeight: 'bold', width: '125.85px' }}>
                                <Link href={"/auth/signup"} className="nav-link" style={{ color: '#fbd800' }}>Đăng ký</Link>
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;