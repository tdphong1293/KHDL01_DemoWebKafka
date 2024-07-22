'use client'

import { FC } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../../layout' // Đảm bảo Layout không có `"use client"`

const Login: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Xử lý logic đăng nhập ở đây
  }

  return (
    <Layout>
      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Layout>
  )
}

export default Login
