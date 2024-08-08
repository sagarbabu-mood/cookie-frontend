import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {
  LoginMainContainer,
  LoginFormContainer,
  LoginFormImage,
  LabelAndInputContainer,
  LoginLabel,
  LoginInput,
  ShowPasswordContainer,
  ShowPasswordInput,
  ShowPasswordLabel,
  LoginButton,
  ErrorMessage,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isPasswordVisible: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = (jwtToken, sessionId) => {
    const {history} = this.props
    console.log(jwtToken, sessionId, 'frontend ')
    Cookies.set('jwt_tokensss', jwtToken)
    Cookies.set('session_id', sessionId, {
      domain: '.onrender.com',
      sameSite: 'None', // Ensure this matches the backend
      secure: true, // Set to true when using HTTPS
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://cookie-backend-oymq.onrender.com/login'
    // const url = 'http://localhost:3019/login'
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.onSubmitSuccess(data.jwt_token, data.session_id)
    } else {
      const data = await response.text()
      this.onSubmitFailure(data)
    }
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  render() {
    const {isPasswordVisible, username, password, errorMsg} = this.state
    const passwordOrText = isPasswordVisible ? 'text' : 'password'

    // const jwtToken = Cookies.get('jwt_token');

    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />;
    // }

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const loginImageUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <LoginMainContainer isDarkTheme={isDarkTheme === true}>
              <LoginFormContainer
                isDarkTheme={isDarkTheme === true}
                onSubmit={this.submitForm}
              >
                <LoginFormImage alt="website logo" src={loginImageUrl} />
                <LabelAndInputContainer>
                  <LoginLabel
                    htmlFor="username"
                    isDarkTheme={isDarkTheme === true}
                  >
                    USERNAME
                  </LoginLabel>
                  <LoginInput
                    id="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    type="text"
                    placeholder="Username: sagar"
                    isDarkTheme={isDarkTheme === true}
                  />
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                  <LoginLabel
                    htmlFor="password"
                    isDarkTheme={isDarkTheme === true}
                  >
                    PASSWORD
                  </LoginLabel>
                  <LoginInput
                    id="password"
                    type={passwordOrText}
                    placeholder="Password: ramsagar"
                    value={password}
                    onChange={this.onChangePassword}
                    isDarkTheme={isDarkTheme === true}
                  />
                </LabelAndInputContainer>
                <ShowPasswordContainer>
                  <ShowPasswordInput
                    checked={isPasswordVisible}
                    onChange={this.onChangeCheckbox}
                    id="checkbox"
                    type="checkbox"
                  />
                  <ShowPasswordLabel
                    htmlFor="checkbox"
                    isDarkTheme={isDarkTheme === true}
                  >
                    Show Password
                  </ShowPasswordLabel>
                </ShowPasswordContainer>
                <LoginButton type="submit">Login</LoginButton>
                {errorMsg && <ErrorMessage>*{errorMsg}</ErrorMessage>}
              </LoginFormContainer>
            </LoginMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default LoginForm
