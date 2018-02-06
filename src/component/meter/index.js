import React from 'react';
import { log } from '../../lib/util';

class Meter extends React.Component {
  state = {
    r1: 3,
    r2: 1,
    r3: 5,
    r4: 9,
  };

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
      { width: this.state.r1, color: 'blue' },
      { width: this.state.r2, color: 'green' },
      { width: this.state.r3, color: 'red' },
      { width: this.state.r4, color: 'yellow' },
    ];
     
    svgProperties = svgProperties.map((properties, index) => (

      <svg key={index} width={width} height={height} >
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
    ));

    return (
      <div>
        {svgProperties}
      </div>
    );
  }
}

export default Meter;
