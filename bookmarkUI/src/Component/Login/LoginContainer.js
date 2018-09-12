import React from 'react';
import Login from './Login'
import apiClient from "./API.js";
import '../../css/login.css';




class LoginContainer extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      email: "",
      password: "",
      invalidEmail: false,
      invalidEmailOrPassword: false,
      showLogin: true,
      showAccountCreated: false,
      showForgotPassword: false,

    }

    this.client = apiClient();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.changeLoginShow = this.changeLoginShow.bind(this);
    this.changeAcountCreated = this.changeAcountCreated.bind(this);
    this.changeForgotPassword = this.changeForgotPassword.bind(this);

  }

  componentDidMount() {
    // this.client.login().then((json) => {

    // })
  }

  changeForgotPassword () {
    this.setState({
      showForgotPassword: !this.state.showForgotPassword,
    })
  }

  changeAcountCreated () {
    this.setState({
      showAccountCreated: !this.state.showAccountCreated,
    })
  }

  changeLoginShow() {
    this.setState({
      showLogin: !this.state.showLogin,
    })
  }

  handleInputChange (value, key) {
     
    if (key == "email") {
      this.setState ({
        email: value,
      })
    } else if (key == "password") {
      this.setState ({
        password: value,
      })
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return true;
      // alert('correct')

    } else {
      // alert('Wrong email format');
      return false
    }
  }


  handleLogin () {
    let self = this;
    let email = this.state.email;
    let password = this.state.password;

    let isEmail = this.validateEmail(email);
    if (isEmail) {
      this.setState({
        invalidEmail: false,
      }, () => {
        this.client.login(email, password).then((json) => {
          if (json.contents) {
            self.setState({
              invalidEmailOrPassword: true,
            })
          } else {
             

            self.setState({
              invalidEmailOrPassword: false,
            }, () => {
              document.cookie = "uEmail=" + json.email;
              
               
              

              this.props.history.push("/user");
            })
          }
        })
      })
    } else {
      this.setState({
        invalidEmail: true,
      })
    }

  }

  componentWillUnmount() {
     
    console.log("unmounted")
  }


  render () {
    return (
      <div className="login-wrapper">
        <Login 
          email={this.state.email}
          password={this.state.password}
          handleInputChange={this.handleInputChange}
          handleLogin={this.handleLogin}
          invalidEmail={this.state.invalidEmail}
          invalidEmailOrPassword={this.state.invalidEmailOrPassword}
          changeLoginShow={this.changeLoginShow}
          showLogin={this.state.showLogin}
          showAccountCreated={this.state.showAccountCreated}
          changeForgotPassword={this.changeForgotPassword}
        />
        {
          this.state.invalidEmailOrPassword ? 
          (
            <div className="alert alert-danger">
              Wrong Email or Passworf
            </div>
          ) : null
        }
      </div>
    )
  }
}


export default LoginContainer;