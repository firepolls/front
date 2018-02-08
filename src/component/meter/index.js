import React, { Component, Fragment } from 'react';

import './_meter.scss';

class Meter extends Component {
  render() {
    const width = 100;
    const height = 10;
    const rx = height / 2;
    const ry = height / 2;
    const style = { transition: 'width 500ms, fill 250ms' }; 

    const { results } = this.props;
    const resultsArray = Object.keys(results).map(key => results[key]);
    const sum = resultsArray.reduce((a, b) => a + b) / 100 || 1;
    const percentages = resultsArray.map(result => result / sum);

    const svgProperties = [ 
      { width: percentages[0], color: 'blue', star: '★' },
      { width: percentages[1], color: 'green', star: '★★' },
      { width: percentages[2], color: 'red', star: '★★★' },
      { width: percentages[3], color: 'yellow', star: '★★★★' },
    ];

    const meterJSX = svgProperties.map((properties) => (
      <div key={Math.random()}>
        <span>{ properties.star }</span>
        <svg width={width} height={height} >
          <rect width={width} height={height} fill="#ccc" rx={rx} ry={ry} />
          <rect
            width={Number(properties.width)}
            height={height}
            fill={properties.color}
            rx={rx}
            ry={ry}
            style={style}
          />
        </svg>
      </div>
    ));

    return meterJSX;
  }
}

export default Meter;
