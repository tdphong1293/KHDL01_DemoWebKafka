// src/app/layout.tsx
'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/auth/login';

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className={inter.className}>
                {!isLoginPage && <Header />}
                <Container>
                    {children}
                </Container>
                {!isLoginPage && <Footer />}
                <ToastContainer />
            </body>
        </html>
    );
}
