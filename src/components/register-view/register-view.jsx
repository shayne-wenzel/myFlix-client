import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//user registration form taking necessary user details
export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(false);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={3}>
     <Form>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                minLength="8" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control 
                type="text"
              />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
        <br></br>
    <div><Button type="submit" onClick={handleSubmit}>
        Or Log In
      </Button>
      </div>
      <br></br>
      </Col> 
     </Row>
  );
}

RegisterView.propTypes = {
  user: PropTypes.exact({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }).isRequired,
};