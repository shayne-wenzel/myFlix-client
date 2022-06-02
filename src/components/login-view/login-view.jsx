import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


import { Button, Col, Container, Form, Row } from 'react-bootstrap/';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    axios.post('https://movime-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

return (
<>

<Row className="justify-content-md-center">
      <Col md={3}>
<Form>
    <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    </Form><br></br>
    <Button type="submit" onClick={handleSubmit}>Submit</Button>
     </Col>
     </Row> </>
);
}

