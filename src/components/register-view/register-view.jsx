import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Routes } from 'react-router-dom';

//user registration form taking necessary user details
export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');



  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required (6 characters long)");
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr("Password must be 5 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Add Email");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmail("Email must be a valid email address");
      isReq = false;
    }

    return isReq;
  };

const handleRegister = (e) => {
  e.preventDefault();
  const isReq = validate();
  if (isReq) {
    axios.post('https://movime-api.herokuapp.com/users', { Username: username, Password: password, Email: email, Birthday: birthday })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("Your registration has been successfully processed. You can now proceed to login.");
        window.open("/", "_self");
        //open in the current tab
      })
      .catch((response) => {
        console.error(response);
        alert("error registering the user");
      });
  }
};
return (
  <>
        <Row className="justify-content-center my-5">
       <Col md={3}>
       <Form>
     <Form.Group>
       <Form.Label>Username*</Form.Label>
       <Form.Control 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password*</Form.Label>
      <Form.Control 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength="5"
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email*</Form.Label>
      <Form.Control 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Birthday</Form.Label>
      <Form.Control 
        type="date" 
        placeholder="dd-mm-yyyy" 
        onChange={(e) => setBirthday(e.target.value)}
        value={birthday}
      />
    </Form.Group>
    <br></br>
            <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
        </Form>
    </Col>
    </Row>
    </>
)
}

// RegisterView.propTypes = {
//   regester: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     birthday: PropTypes.string
//   }).isRequired,
// };

