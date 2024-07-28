import React from 'react';
import cl from './Loader.module.scss';

const Loader = () => {
  return (
      <div data-testid="loader"  className={cl.loader}></div>
  );
};

export default Loader;
