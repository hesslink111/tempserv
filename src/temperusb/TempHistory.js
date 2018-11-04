// @flow

import Deque from 'double-ended-queue';

/**
 * Keep track of the temperatures for a certain period.
 */
export default class TempHistory {

  maxSize: number;
  history: Deque = new Deque();

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  addTemp = (temp: number) => {
    this.history.push(temp);
  };

  getSummary = (): { avg: number, min: number, max: number } => {
    let min = Infinity;
    let max = Infinity;
    let sum = 0;
    for(let i=0; i<this.history.length; i++) {
      const temp = this.history.get(i);
      sum += temp;
      if(temp < min) {
        min = temp;
      }
      if(temp > max) {
        max = temp;
      }
    }
    return {
      avg: sum / this.history.length,
      min: min,
      max: max
    };
  }
}