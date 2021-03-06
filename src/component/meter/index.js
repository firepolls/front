import React, { Component } from 'react';

import './_meter.scss';

class Meter extends Component {
  render() {
    const width = 100;
    const height = 10;
    const rx = height / 2;
    const ry = height / 2;
    const style = { transition: 'width 500ms, fill 250ms' }; 

    const { resultsArray, totalVotes } = this.props;
    // Rob - totalVotes or 1, because of math, divided by 100 because of percents
    const divisor = totalVotes / 100 || 1;
    
    const percentages = resultsArray.map(result => result / divisor);

    const svgProperties = [ 
      { width: percentages[0], color: '#19ECC5', star: '★' },
      { width: percentages[1], color: '#B085EC', star: '★★' },
      { width: percentages[2], color: '#2186D8', star: '★★★' },
      { width: percentages[3], color: '#EC1940', star: '★★★★' },
    ];

    const meterJSX = svgProperties.map((properties, index) => ( 
      <div 
        key={index.toString()}
        className="single-meter"
      >
        <div>
          <span>{ properties.star }</span>
        </div>

        <svg 
          width={width} 
          height={height}
        >
          <rect 
            width={width} 
            height={height} 
            fill="#ccc" 
            rx={rx} 
            ry={ry} 
          />
          <rect
            width={Number(properties.width)}
            height={height}
            fill={properties.color}
            rx={rx}
            ry={ry}
            style={style}
          />
        </svg>
        <div className="percentage">
          {properties.width ? `${Math.round(properties.width)}%` : <div className="percentage-placeholder" />} 
        </div>
      </div>
    ));

    return meterJSX;
  }
}

export default Meter;
