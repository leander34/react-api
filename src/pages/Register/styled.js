// color: ${(prosp) => (prosp.isRed ? 'red' : 'blue')};
import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input {
    padding: 10px;
    margin-top: 10px;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    margin-top: 10px;
  }
`;
