'use client';

import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../../styles/page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login: FC = () => {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Xử lý logic đăng nhập ở đây
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email,
                password
            })

            if (response.status === 201) {
                const { token, user } = response.data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                toast.success("Đăng nhập thành công");
                router.push('/home');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 401:
                        toast.error("Tài khoản không tồn tại. Vui lòng đăng ký tài khoản");
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
            <div className={styles.topPanel}>
                <p className={`${styles.description} ${styles.brand}`}>Đăng nhập tài khoản</p>
            </div>
            <div className={styles.bottomPanel}>
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
                    <div className={styles.forgotPassword}>
                    <Link href="/home">
                      <p>
                        Trở về trang chủ
                      </p>
                    </Link>
                    </div>
                    
                    <hr className={styles.separator} />

                    <Link href="/auth/signup">
                        <Button variant="success" className={styles.createAccountButton}>
                            Đăng ký tài khoản
                        </Button>
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default Login;
