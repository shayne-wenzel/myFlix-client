import React, { useState } from 'react';
import { RegisterView } from '../register-view/register-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
      props.onLoggedIn(username);
  };

return (
  <form>
    <label>
      Username:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    <label>
      Password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <button type="submit" onClick={handleSubmit}>Submit</button>
    <button 
          // onClick={() => {
          //   this.setState({isRegistered: false});
        // }}
      >
        Register Here
        </button>
  </form>
);
}

