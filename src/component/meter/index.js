import React, { Component, Fragment } from 'react';
// import uuidv1 from 'uuid/v1';

import './_meter.scss';

class Meter extends Component {
  constructor(props) {
    super(props);
    this.lastUpdateDate = new Date();
    // this.id = uuidv1();
    // console.log("FUCK YOUR COUCH");
  }

  componentDidMount() {
    console.log(' METER MOUNTED');
  }


  // shouldComponentUpdate() {
    // console.log("Do not update");
    // return false;
    // const now = new Date();
    // const seconds = (now.getTime() - this.lastUpdateDate.getTime()) / 1000;
    // console.log('HITTING SHOULD');
    // return seconds >= 1;
  // }
  
  componentDidUpdate() {
    console.log('METER DID UPDATE');
    this.lastUpdateDate = new Date();
  }
  
  componentWillUnmount() {
    console.log('METER unmounting............');
  }

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
      { width: percentages[0], color: 'blue', star: '★' },
      { width: percentages[1], color: 'green', star: '★★' },
      { width: percentages[2], color: 'red', star: '★★★' },
      { width: percentages[3], color: 'yellow', star: '★★★★' },
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
          {properties.width ? `${Math.floor(properties.width * 100) / 100}%` : <div className="percentage-placeholder" />} 
        </div>
      </div>
    ));

    return meterJSX;
  }
}

export default Meter;
