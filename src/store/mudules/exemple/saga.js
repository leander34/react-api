import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exempleRequest() {
  try {
    yield call(request);
    yield put(actions.clicaBotaoSuccess());
  } catch (e) {
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exempleRequest)]);
