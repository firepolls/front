import React, { Fragment } from 'react';

import './_meter.scss';

class Meter extends React.Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (this.props.results !== nextProps.results) {
      const sum = Object.keys(nextProps.results)
        .map(key => nextProps.results[key])
        .reduce((a, b) => a + b) / 100;

      this.setState({
        r1: nextProps.results['1'] / sum,
        r2: nextProps.results['2'] / sum,
        r3: nextProps.results['3'] / sum,
        r4: nextProps.results['4'] / sum,
      });
    }
  }

  render() {
    const width = 100;
    const height = 10;
    const rx = height / 2;
    const ry = height / 2;
    const style = { transition: 'width 500ms, fill 250ms' }; 

    let svgProperties = [ 
      { width: this.state.r1, color: 'blue', star: '★★★★' },
      { width: this.state.r2, color: 'green', star: '★★★' },
      { width: this.state.r3, color: 'red', star: '★★' },
      { width: this.state.r4, color: 'yellow', star: '★' },
    ];

    const meterJSX = svgProperties.map((properties, index) => (
      <Fragment key={index}>
        { properties.star }
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
      </Fragment>
    ));

    return (
      <div>
        {meterJSX}
      </div>
    );
  }
}

export default Meter;
