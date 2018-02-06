import { v1 as uuid } from 'uuid';

class Poll {
  constructor(question) {
    this.question = question;
    this.results = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };
    this.id = uuid();
  }
}

export default Poll;
