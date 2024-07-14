import React from 'react';
import { StatsInterface } from '../fetch/fetch.tsx';

const Stats: React.FC<StatsInterface> = ({ stat, base_stat }) => {
  return (
    <p>
      {stat.name}: {base_stat}
    </p>
  );
};

export default Stats;
