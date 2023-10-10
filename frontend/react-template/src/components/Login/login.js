import React, { useState, useEffect } from 'react';
import "../../styles/login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [flashMessages, setFlashMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 200) {
        // Login successful, you can redirect to the home page or perform any other actions
        window.location.href = '/'; // Redirect to the home page
      } else {
        // Login failed, handle errors accordingly
        const data = await response.json();
        setFlashMessages([{ type: 'error', message: data.error }]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch flash messages from the backend during component initialization
  useEffect(() => {
    // Make a fetch request to your backend to retrieve flash messages
    fetch('http://localhost:5000/get-flash-messages') // Use the correct endpoint
      .then((response) => response.json())
      .then((data) => {
        setFlashMessages(data.flashMessages);
      })
      .catch((error) => {
        console.error('Error fetching flash messages:', error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#ccc' }}>
      <div className="login-box">
        <div className="login-body">
          <p>Please enter your username and password</p>
          <form className="form-group" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <b>Remember</b>
            <input
              type="submit"
              value="Login"
              className="form-control btn btn-success"
            />
          </form>
          {/* Render flash messages */}
          {flashMessages.map((message, index) => (
            <div key={index} className={`alert alert-${message.type}`}>
              {message.message}
            </div>
          ))}
          <p>
            No account <a href="/register" className="btn btn-dark">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
