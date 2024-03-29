import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #fff;
    font-weight: bold;
    margin-right: 10px;
  }
`;
