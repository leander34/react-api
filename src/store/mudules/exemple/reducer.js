import { toast } from 'react-toastify';
import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('sucesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('DEU ERRO =(');
      toast.error('Deu erro =(', {
        toastId: 1,
      });
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('Estou fazendo a requisição');
      return state;
    }

    default:
      return state;
  }
}
