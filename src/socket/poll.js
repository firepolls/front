import { v1 as uuid } from 'uuid';

const emptyResults = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

class Poll {
  constructor(question, results = emptyResults, id = uuid()) {
    this.question = question;
    this.results = results;
    this.active = true;
    this.id = id;
  }
  // Anthony - return a new poll rather than mutate the state
  castVote(number) {
    const pollCopy = new Poll(this.question, this.results, this.id);
    pollCopy.results[number]++;
    return pollCopy;
  }
}

export default Poll;
