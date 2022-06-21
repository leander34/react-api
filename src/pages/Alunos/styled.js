// color: ${(prosp) => (prosp.isRed ? 'red' : 'blue')};
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }

  .actions {
    gap: 8px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    clip-path: circle();
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
