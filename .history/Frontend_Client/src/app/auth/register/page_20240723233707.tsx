'use client';

import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../../styles/page.module.css';
import Link from 'next/link';

const Register: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý logic đăng ký ở đây
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.topPanel}>
        <p className={`${styles.description} ${styles.brand}`}>Create Your Account</p>
      </div>
      <div className={styles.bottomPanel}>
        <Form onSubmit={handleSubmit} className={styles.loginForm}>
          <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
            <Form.Control type="email" placeholder="Email address" required className={styles.input} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
            <Form.Control type="password" placeholder="Password" required className={styles.input} />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className={styles.formGroup}>
            <Form.Control type="password" placeholder="Confirm Password" required className={styles.input} />
          </Form.Group>

          <Button variant="primary" type="submit" className={styles.loginButton}>
            Register
          </Button>

          <div className={styles.forgotPassword}>
            <Link href="/auth/login">
                <p>Already have an account? Log In</p>
            </Link> 
          </div>

          <hr className={styles.separator} />

          <Button variant="success" className={styles.createAccountButton}>
            Create New Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
