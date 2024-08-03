import { Inter } from "next/font/google";
import { Container } from "react-bootstrap";
import Header from "@/components/header";
import Footer from "@/components/footer";
import dynamic from 'next/dynamic';

const HeaderCSR = dynamic(() => import('../../components/header'), {ssr: false});

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("HomeLayout rendered");
    return (
        <>
            <HeaderCSR />
            <Container className={`${inter.className} pt-5`}>
                <Container className="mt-2">
                    {children}
                </Container>
            </Container>
            <Footer />
        </>
    );
}