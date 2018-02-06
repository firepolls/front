import React, { Component, Fragment } from 'react';
// import PollItem from '../poll-item';


class PollList extends Component {
  state={
    polls: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.room !== nextProps.room) {
      const newPolls = [];
      nextProps.room.polls.forEach((polls, index) => {
        newPolls.push(nextProps.room.polls[index]);
        this.setState({
          polls: newPolls,
        });
      });
    }
  }

  render() {
    console.log('__POLL-LIST-NEW-STATE__', this.state.polls);
  
    const pollListJSX = this.props.room && this.state.polls[0] ?
    
      (
        
        <div>
          {this.state.polls[0].question}
        </div>
      
      )
      : null;
    
    return (
      <main className="polls-container">
        {pollListJSX}
      </main>
    );
  }
}

const whereIsQuestion = () => {
  if (this.state.polls[0]) console.log('Is there a question?', this.state.polls[0].question);
  return null;    
};

export default PollList;


// <PollItem
//   key={pollId}
//   poll={this.props.room.poll[index]} />
