import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import * as actions from '../../store/mudules/auth/actions';
import { Container } from '../../Styles/GlobalStyles';
import { Title, Form } from './styled';
import Loading from '../../components/Loading';

function Fotos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Foto[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        navigate('/');
      }
    }

    getData();
  }, [id, navigate]);

  async function handleChange(e) {
    const file = e.target.files[0];
    const fotoUrl = URL.createObjectURL(file);
    setFoto(fotoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);
      await axios.post('/fotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', 0);
      toast.error('Erro ao enviar a mensagem');
      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={(e) => handleChange(e)} />
        </label>
      </Form>
    </Container>
  );
}

export default Fotos;
