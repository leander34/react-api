import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Container } from '../../Styles/GlobalStyles';
import { Form, Titulo, Profilepicture } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/mudules/auth/actions';

function Aluno() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const id = get(match, 'params.id', 0);
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [foto, setFoto] = useState('');
  const [altura, setAltura] = useState('');

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'data.Foto[0].url', '');
        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        const status = get(err, 'response.status', 0);
        if (status === 400)
          errors.map((error) =>
            toast.error(error, {
              toastId: error,
            })
          );

        navigate('/');
      }
    }

    getData();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Inválida inválida');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso');
      } else {
        const { data } = await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno(a) criado(a) com sucesso');
        navigate(`/aluno/${data.id}/edit`);
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  }
  return (
    <Container>
      <Titulo>{id ? 'Editar aluno' : 'Cadastrar novo aluno'}</Titulo>

      {id && (
        <Profilepicture>
          {foto ? <img src={foto} alt="nome" /> : <FaUserCircle size={160} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </Profilepicture>
      )}

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />

        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />

        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

export default Aluno;

// Aluno.propTypes = {
//   match: PropTypes.shape({}).isRequired,
// };
