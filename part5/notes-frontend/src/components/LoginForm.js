import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  password,
  username,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username{' '}
        <input
          type="text"
          value={username}
          id="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password{' '}
        <input
          type="password"
          value={password}
          id="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
