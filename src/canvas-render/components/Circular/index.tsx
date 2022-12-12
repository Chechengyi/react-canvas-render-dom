import React from 'react';
import { TYPES } from '../index';
import type { CircularProps } from './circular'

export const Circular: React.FC<CircularProps> = (props) => {
  // @ts-ignore
  return <TYPES.Circular {...props} />
};
