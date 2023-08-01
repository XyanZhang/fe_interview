import React, { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';

export default function WindowSize(props) {
  const size = useWindowSize();
  return (
    <div>
      <h1>use window size</h1>
      {size}
    </div>
  )

}