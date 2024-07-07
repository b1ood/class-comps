import React, { Component, ReactNode } from 'react';
import './err.scss';

type ErrComp = {
  hasError: boolean;
};

interface ErrProps {
  children: ReactNode | ReactNode[];
}

class ErrorBoundary extends Component<ErrProps, ErrComp> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="err-message">
          <h2>Oh no... Something went wrong</h2>
          <p>Don't worry, just refresh this page</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
