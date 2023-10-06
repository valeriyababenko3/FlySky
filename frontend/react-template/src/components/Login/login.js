import React, { useState, useEffect } from 'react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [flashMessages, setFlashMessages] = useState([]); 


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = e.target.username.value;
    const password = e.target.password.value;
    const remember = e.target.remember.checked;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.status === 200) {
        // Login successful, you can redirect to the home page or perform any other actions
        window.location.href = '/'; // Redirect to the home page
      } else {
        // Login failed, handle errors accordingly
        const data = await response.json();
        alert(data.message); // Display the error message from the backend
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    // Fetch flash messages from the backend during component initialization
    useEffect(() => {
        // Make a fetch request to your backend to retrieve flash messages
        fetch('/get-flash-messages') // Replace with the actual endpoint
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
        <div className="login-header">Login</div>
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
              value={remember}
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
            <div key={index} className="flash-message">
              {message}
            </div>
          ))}
          <p>
            No account <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
