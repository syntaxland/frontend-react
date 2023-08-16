// ResetPasswordRequest
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendPasswordResetLink } from '../../actions/userProfileActions';
import { Form, Button, Container } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';

function ResetPasswordRequest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  
  const sendPasswordLink = useSelector((state) => state.sendPasswordResetLink);
  const { success, error, loading } = sendPasswordLink;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetLink(email));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  }, [success, history]);

  return (
    <Container>
      <h1 className="text-center">Reset Password</h1>
      {success && (
        <Message variant="success">
          Password reset link sent successfully to {email}.
        </Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Send Reset Link
        </Button>
      </Form>
    </Container>
  );
}

export default ResetPasswordRequest;
