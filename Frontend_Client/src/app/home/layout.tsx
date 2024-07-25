'use client';

import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("HomeLayout rendered");
    return (
        <Container className={`${inter.className} pt-5`}>
            <Header />
            <Container className="mt-2"> 
            {children}
            </Container>
            <ToastContainer />
            <Footer />
        </Container>
    );
}