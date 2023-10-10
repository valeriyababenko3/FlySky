import React, { useState, useEffect } from 'react';
import '../../styles/register.css';

function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessages, setFlashMessages] = useState([]);

  useEffect(() => {
    // Fetch flash messages from the backend during component initialization
    fetch('http://localhost:5000/get-flash-messages')
      .then((response) => response.json())
      .then((data) => {
        // Handle flash messages here, e.g., update state or display them
        const flashMessages = data.flashMessages;
        setFlashMessages(flashMessages);
      })
      .catch((error) => {
        console.error('Error fetching flash messages:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the user's input
    const data = {
      fullname: fullname,
      email: email,
      username: username,
      password: password,
    };

    try {
      // Send a POST request to your backend for registration
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convert data to JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        // Registration successful, display a success message
        setFlashMessages([{ type: 'success', message: responseData.message }]);
        // Redirect to the login page
        window.location.href = '/login';
      } else {
        // Registration failed, display an error message
        setFlashMessages([{ type: 'error', message: responseData.error }]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#ccc' }}>
      <div className="container">
        <div className="row main">
          <div className="main-login main-center">
            <h5>Register New User or Log In to an Existing Account</h5>
            <form
              action="http://localhost:5000/register"
              method="post"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="fullname" className="cols-sm-2 control-label">
                  Your Name
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      placeholder="Enter your Name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="cols-sm-2 control-label">
                  Your Email
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username" className="cols-sm-2 control-label">
                  Username
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-users fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="cols-sm-2 control-label">
                  Password
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Flash messages */}
              {flashMessages.map((message, index) => (
                <div
                  key={index}
                  className={`alert alert-${message.type}`}
                  role="alert"
                >
                  {message.message}
                </div>
              ))}

              <input
                type="submit"
                value="Register"
                className="form-control btn btn-primary"
              />
              <p style={{ padding: '5px' }}>
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
