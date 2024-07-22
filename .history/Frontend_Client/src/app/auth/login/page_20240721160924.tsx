import { FC } from 'react'
import Layout from '../../../layout'
import { Form, Button } from 'react-bootstrap'

const Login: FC = () => (
  <Layout>
    <h1>Login</h1>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  </Layout>
)

export default Login
