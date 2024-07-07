import React, { Component } from 'react';
import cl from './Loader.module.scss';

class Loader extends Component<null, null> {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={cl.loader}></div>;
  }
}

export default Loader;
