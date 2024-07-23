// src/app/home/page.tsx
import Link from "next/link";
import Table from "@/components/table";

const Home = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/facebook">Facebook</Link>
                </li>
                <li>
                    <Link href="/tiktok">Tiktok</Link>
                </li>
                <li>
                    <Link href="/youtube">Youtube</Link>
                </li>
            </ul>
            <Table />
        </div>
    );
};

export default Home;
