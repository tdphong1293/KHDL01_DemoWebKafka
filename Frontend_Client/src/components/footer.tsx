'use client';
export default function Footer() {
    return (
        // <footer className="bg-dark text-light py-3">
        //     <div className="container-fluid mx-0">
        //         <div className="d-flex justify-content-center align-items-center">
        //             &copy; 2024 TripleDuck
        //         </div>
        //     </div>
        // </footer>
        <footer>
            <div className='text-center p-3' style={{ backgroundColor: 'black', color: 'white' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a href='/home' style={{ color: 'white ' }}>
                    TripleDuck
                </a>
            </div>
        </footer>
    );
}
