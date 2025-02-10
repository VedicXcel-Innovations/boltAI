import React from 'react';

const DoubleArrowDownIcon = ({ size = 24, color = 'black' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 10l6 6 6-6H6z" />
    <path d="M6 4l6 6 6-6H6z" />
  </svg>
);

const DoubleArrowUpIcon = ({ size = 24, color = 'black' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 14l-6-6-6 6h12z" />
    <path d="M18 20l-6-6-6 6h12z" />
  </svg>
);

export { DoubleArrowDownIcon, DoubleArrowUpIcon };
