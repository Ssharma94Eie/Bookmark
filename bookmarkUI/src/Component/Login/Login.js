import React from 'react'

function Login (props) {
  return (
    <div className="login-box">
      <h3 className="login-title">LogIn</h3>
      <div className="form-group relative">
        <label className="glyphicon glyphicon-envelope absolute"></label>
        <input 
          type="email" 
          className="form-control" 
          placeholder="Email"
          value={props.email}
          onChange={(e) => {props.handleInputChange(e.target.value, "email")}}
        />
        {
          props.invalidEmail ?
          (
            <span className='error'>!</span>
          ) : null
        }
        
      </div>
      <div className="form-group relative">
        <label className="glyphicon glyphicon-lock absolute"></label>
        <input 
          type="password" 
          className="form-control" 
          placeholder="Password"
          value={props.password}
          onChange={(e) => {props.handleInputChange(e.target.value, "password")}}
        />
      </div>
      {/*<div className="form-group">
        <label htmlFor="remember" className="remember-label">Remember Me</label>
        <input id="remember" type="checkbox"  />
      </div>*/}
      <div className="clearfix">
        <button 
          className="btn btn-success login-btn"
          onClick={props.handleLogin}
        >
          Login
        </button>
        <a
          className="forgot-password" 
          onClick={props.changeForgotPassword}
        >Forgot Password</a>

      </div>
        <a
          className="signup-button"
          onClick={props.changeLoginShow}
        >Not a member? Sign Up</a>
      <div>
      </div>
      {
        props.invalidEmailOrPassword ?
        (
          <div class="alert alert-danger">
            Incorrect Email or Password.
          </div>
        ) : null
      }

      {
        props.showAccountCreated ?
        (
          <div class="alert alert-success">
            Account Created
          </div>
        ) : null
      }
      
    </div>

  )
}

export default Login;