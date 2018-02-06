import React from 'react';
import { log } from '../../lib/util';

class Meter extends React.Component {
  state = {
    r1: 0,
  };

  componentWillReceiveProps(nextProps) {
    log('THIS PROPS RESULTS------', this.props.results);
    log('NEXT PROPS RESULTS------', nextProps.results);
    if (this.props.results !== nextProps.results) {
      
      log('---------I SHOULD BE ANIMATING-----------');
      this.setState({
        r1: nextProps.results['1'] * 50,
        r2: nextProps.results['2'],
        r3: nextProps.results['3'],
        r4: nextProps.results['4'],
      });
    }
  }

  render() {
    // const percent = result.P1[randomPercentage(0, 4)] / totalVotes;

    // const rValue = rounded ? Math.ceil(height / 2) : 0;
    // const animatedWidth = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
    const style = { transition: 'width 500ms, fill 250ms' }; 

    return (
      <svg width={100} height={10} >
        <rect width={100} height={10} fill="#ccc" rx={5} ry={5} />
        <rect
          width={Number(this.state.r1)}
          height={10}
          fill="blue"
          rx={5}
          ry={5}
          style={style}
        />
      </svg>
    );
  }
}

export default Meter;

//   const totalVotes = result.P1.reduce((accumulator, currentValue) => accumulator + currentValue);
//   function randomPercentage(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
//   }
  
//   const percent = result.P1[randomPercentage(0, 4)] / totalVotes;


//   const rValue = rounded ? Math.ceil(height / 2) : 0;
//   const animatedWidth = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
//   const style = animate ? { transition: 'width 500ms, fill 250ms' } : null; 

//   return (
//     <svg width={width} height={height} aria-label={label}>
//       <rect width={width} height={height} fill="#ccc" rx={rValue} ry={rValue} />
//       <rect 
//         width={animatedWidth} 
//         height={height} 
//         fill={color} 
//         rx={rValue} 
//         ry={rValue} 
//         style={style} 
//       />
//     </svg>
//   );
// };
