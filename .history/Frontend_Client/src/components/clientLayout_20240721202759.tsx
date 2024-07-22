// src/components/ClientLayout.tsx
'use client';

import { Container } from 'react-bootstrap';
import Header from './header';
import Footer from './footer';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      //<Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  );
}
