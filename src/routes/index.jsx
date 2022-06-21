import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Login from '../pages/login';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

export default function Router() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  function myRoute(Element, isClosed = false) {
    if (isClosed && !isLoggedIn) {
      return (
        <Navigate
          to={{
            pathname: '/login',
          }}
        />
      );
    }
    return Element;
  }
  return (
    <Routes>
      <Route path="/" element={myRoute(<Alunos />, true)} />
      <Route path="/aluno/:id/edit" element={myRoute(<Aluno />, true)} />
      <Route path="/aluno/" element={myRoute(<Aluno />, true)} />
      <Route path="/fotos/:id" element={myRoute(<Fotos />, true)} />
      <Route path="/login/" element={myRoute(<Login />)} />
      <Route path="/register/" element={myRoute(<Register />)} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
