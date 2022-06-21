import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../Styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/mudules/auth/actions';
import Loading from '../../components/Loading';

function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password }));

    if (isLoggedIn) {
      navigate(-1);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={email}
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

export default Login;
