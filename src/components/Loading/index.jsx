import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

export default function Loading({ isLoading }) {
  // eslint-disable-next-line
  if (!isLoading) return <></>;

  return (
    // eslint-disable-next-line
    <></>
    // <Container>
    //   <div />
    //   <span>Carregando...</span>
    // </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
