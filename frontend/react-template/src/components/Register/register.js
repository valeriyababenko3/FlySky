import React, { useState } from 'react';


function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessages, setFlashMessages] = useState([]);

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
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Registration successful, display a success message
        setFlashMessages([{ type: 'success', message: responseData.message }]);
      } else {
        // Registration failed, display an error message
        setFlashMessages([{ type: 'error', message: responseData.message }]);
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
              action="/register" // Replace with the appropriate route
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

              <div className="form-group">
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
              </div>

              <input
                type="submit"
                value="Register"
                className="form-control btn btn-primary"
              />
              <p style={{ padding: '5px' }}>
                <a href="/login" className="btn btn-dark">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
