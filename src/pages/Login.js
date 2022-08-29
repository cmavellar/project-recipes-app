import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Logo from '../images/tryfood.png';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();
  const minPassword = 5;

  const submitLogin = () => {
    const userObj = { email };
    const userObjJSON = JSON.stringify(userObj);
    localStorage.setItem('user', userObjJSON);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  const validateButton = () => {
    if (
      email.includes('@')
      && email.length > 0
      && email.includes('.')
      && password.length > minPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'Email') {
      setEmail(target.value);
      validateButton();
    } else {
      setPassword(target.value);
      validateButton();
    }
  };

  return (
    <div className="container">
      <img className="logo" src={ Logo } alt="logoImage" />
      <div className="content">
        <form>
          <input
            className="login-input"
            name="Email"
            data-testid="email-input"
            type="email"
            placeholder="Insira seu email"
            value={ email }
            onChange={ handleChange }
          />
          <input
            className="login-input"
            name="Password"
            data-testid="password-input"
            type="password"
            placeholder="Insira sua senha"
            value={ password }
            onChange={ handleChange }
          />
          <button
            className="login-button"
            type="button"
            data-testid="login-submit-btn"
            onClick={ submitLogin }
            disabled={ isDisabled }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
