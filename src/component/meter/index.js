import React from 'react';

const Meter = (props) => {
  const {
    width = 100,
    height = 10,
    rounded = true,
    color = 'blue',
    animate = false,
    label = null,
  } = props;

  const result = {
    P1: [1, 2, 3, 4],
    P2: [4, 3, 2, 1],
    P3: [2, 3, 4, 1],
    P4: [3, 2, 3, 1],
    P5: [4, 6, 2, 1],
    P6: [9, 4, 2, 1],
    P7: [5, 3, 2, 7],
  };
  const totalVotes = result.P1.reduce((accumulator, currentValue) => accumulator + currentValue);
  function randomPercentage(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  const percent = result.P1[randomPercentage(0, 4)] / totalVotes;


  const rValue = rounded ? Math.ceil(height / 2) : 0;
  const animatedWidth = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
  const style = animate ? { transition: 'width 500ms, fill 250ms' } : null; 

  return (
    <svg width={width} height={height} aria-label={label}>
      <rect width={width} height={height} fill="#ccc" rx={rValue} ry={rValue} />
      <rect 
        width={animatedWidth} 
        height={height} 
        fill={color} 
        rx={rValue} 
        ry={rValue} 
        style={style} 
      />
    </svg>
  );
};

export default Meter;

