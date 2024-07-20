'use client'
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

const Facebook = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    };

    return (
        <>
            <div>Facebook</div>
            <div>
                <Button variant="success" onClick={handleClick}>Bootstrap Back Button</Button>
                <button onClick={handleClick}>Back</button>
            </div>
        </>
    );
};

export default Facebook;