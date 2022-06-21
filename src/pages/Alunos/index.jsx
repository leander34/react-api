import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { Container } from '../../Styles/GlobalStyles';
import { AlunoContainer, NovoAluno, ProfilePicture } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos/');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  function handleDeleteAsk(e) {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  }

  async function handleDelete(e, id, index) {
    try {
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
    } catch (error) {
      const status = get(error, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <NovoAluno to="/aluno/">Novo aluno</NovoAluno>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={aluno.id}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="Foto do alunos" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <div className="actions">
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>
              <Link
                onClick={(e) => handleDeleteAsk(e)}
                to={`/aluno/${aluno.id}/delete`}
              >
                <FaWindowClose size={16} />
              </Link>
              <FaExclamation
                onClick={(e) => handleDelete(e, aluno.id, index)}
                size={16}
                display="none"
                cursor="pointer"
              />
            </div>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}

export default Alunos;
