import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../Styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/mudules/auth/actions';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const id = useSelector((state) => state.auth.user.id) || null;
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);

  useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [id, nomeStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(
      actions.registerRequest({ nome, email, password, id: id || null })
    );
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Alterar conta' : 'Criar conta'}</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            autoComplete="off"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            autoComplete="off"
            id="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}

export default Register;
