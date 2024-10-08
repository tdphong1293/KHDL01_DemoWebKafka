'use client';

import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../../styles/page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const host = process.env.NEXT_PUBLIC_SERVER_HOST || "localhost";

const Login: FC = () => {

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await axios.post(`http://${host}:8080/api/users/login`, {
                email,
                password
            })

            if (response.status === 200) {
                const { token, user } = response.data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                toast.success("Đăng nhập thành công");
                router.push("/home");
            }
            else if (response.status === 201) {
                const { token, user } = response.data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                toast.success("Đăng nhập thành công");
                router.push("/admin");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 401:
                        toast.error("Sai Email hoặc mật khẩu.");
                        break;
                    case 500:
                    default:
                        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
                        break;
                }
            } else {
                console.error('Unexpected error:', error);
                toast.error('Đăng nhập thất bại vì lỗi không xác định');
            }
        }
    };
    return (
        <div className={styles.loginContainer}>

            <div className='container'>
                <div className='row'>
                    <div className='col-sm d-flex justify-content-center align-items-center'>
                        <Link href={'/home'}>
                            <img src='/assets/logo_login.png' alt='logo_login'></img>
                        </Link>
                    </div>
                    <div className='col-sm d-flex justify-content-center align-items-center'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className={styles.topPanel}>
                                <p className={`${styles.description} ${styles.brand}`}>Đăng nhập tài khoản</p>
                            </div>
                            <div className={styles.bottomPanel} >
                                <Form onSubmit={handleSubmit} className={styles.loginForm}>
                                    <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
                                        <Form.Control name="email" type="email" placeholder="Địa chỉ email" required className={styles.input} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
                                        <Form.Control name="password" type="password" placeholder="Mật khẩu" required className={styles.input} />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className={styles.loginButton}>
                                        Đăng nhập
                                    </Button>

                                    <hr className={styles.separator} />

                                    <Link href="/auth/signup">
                                        <Button variant="success" className={styles.createAccountButton}>
                                            Đăng ký tài khoản
                                        </Button>
                                    </Link>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
