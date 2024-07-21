// src/app/auth/login/page.tsx
'use client';

import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import ClientLayout from '@/components/clientLayout';
import styles from '../../page.module.css';

const Login: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý logic đăng nhập ở đây
  };

  return (
    <ClientLayout>
      <div className={styles.loginContainer}>
        <div className={styles.leftPanel}>
          <h1 className={styles.brand}>Facebook</h1>
          <p className={styles.description}>Connect with friends and the world around you on Facebook.</p>
        </div>
        <div className={styles.rightPanel}>
          <Form onSubmit={handleSubmit} className={styles.loginForm}>
            <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
              <Form.Control type="email" placeholder="Email address" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className={styles.loginButton}>
              Log In
            </Button>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <hr />

            <Button variant="success" className={styles.createAccountButton}>
              Create New Account
            </Button>
          </Form>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Login;
