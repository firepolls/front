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
    const {
      polls,
    } = this.state;

    console.log('__POLL-LIST-NEW-STATE__', this.state.polls);
     
    return ( 
      <main className="polls-container">
        {
          this.props.room && this.state.polls[0] !== undefined ?

            polls.map((poll) => 
              (
                <div key={poll.id}>
                  {poll.question}
                </div>)
            )
            : null
        }
      
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
