import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const loginDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 1,
      })
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {userId, pin, errorMsg} = this.state
    const JwtToken = Cookies.get('jwt_token')

    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="inner-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="image"
            />
          </div>
          <form className="form" onSubmit={this.onLogin}>
            <h1 className="head">Welcome Back!</h1>
            <div className="input-container">
              <label className="label" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
                value={userId}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
                value={pin}
              />
            </div>
            <button type="submit" className="button">
              Login
            </button>
            {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
