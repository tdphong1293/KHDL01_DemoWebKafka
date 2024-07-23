// src/app/auth/login/page.tsx
'use client';

import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../../styles/page.module.css';
import Link from 'next/link';

const Login: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý logic đăng nhập ở đây
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.topPanel}>
        <p className={`${styles.description} ${styles.brand}`}>Welcome to My App</p>
      </div>
      <div className={styles.bottomPanel}>
        <Form onSubmit={handleSubmit} className={styles.loginForm}>
          <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
            <Form.Control type="email" placeholder="Email address" required className={styles.input} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
            <Form.Control type="password" placeholder="Password" required className={styles.input} />
          </Form.Group>
          <Button variant="primary" type="submit" className={styles.loginButton}>
            Log In
          </Button>
          <div className={styles.forgotPassword}>
            <a href="#">Forgot password?</a>
          </div>
          <hr className={styles.separator} />
          <Link href="/auth/register">
            <Button variant="success" className={styles.createAccountButton}>
              Create New Account
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

// const Login = () => {
//   return (
//       <>
//           Login
//       </>
//   );
// };

export default Login;
