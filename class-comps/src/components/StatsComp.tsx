import React, { Component } from 'react';
import { StatsInterface } from '../fetch/fetch.tsx';

class StatsComp extends Component<StatsInterface, null> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>
        {this.props.stat.name}: {this.props.base_stat}
      </p>
    );
  }
}

export default StatsComp;
