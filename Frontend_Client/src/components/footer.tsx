'use client'


export default function Footer() {
    return (
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
