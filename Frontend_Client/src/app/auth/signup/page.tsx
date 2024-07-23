'use client';

import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../../styles/page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Xử lý logic đăng ký ở đây
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', {
                username,
                email,
                password
            });

            if (response.status === 201) {
                toast.success("Đăng ký thành công");
                router.push('/auth/login');
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 409:
                        toast.error("Tên đăng nhập hoặc Email đã tồn tại");
                        break;
                    case 500:
                    default:
                        toast.error("Đăng ký thất bại. Vui lòng thử lại sau.");
                        break;
                }
            } else {
                console.error('Unexpected error:', error);
                toast.error('Đăng ký thất bại vì lỗi không xác định');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.topPanel}>
                <p className={`${styles.description} ${styles.brand}`}>Create Your Account</p>
            </div>
            <div className={styles.bottomPanel}>
                <Form onSubmit={handleSubmit} className={styles.loginForm}>
                    <Form.Group controlId="formBasicUsername" className={styles.formGroup}>
                        <Form.Control name="username" type="text" placeholder="Tên đăng nhập" required className={styles.input} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
                        <Form.Control name="email" type="email" placeholder="Địa chỉ email" required className={styles.input} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
                        <Form.Control name="password" type="password" placeholder="Mật khẩu" required className={styles.input} />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className={styles.formGroup}>
                        <Form.Control name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required className={styles.input} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className={styles.loginButton} disabled={isLoading}>
                        {isLoading ? 'Đăng thực hiện đăng ký ...' : 'Đăng ký tài khoản'}
                    </Button>

                    <div className={styles.forgotPassword}>
                        <Link href="/auth/login">
                            <p>Đã có tài khoản? Đăng nhập</p>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
