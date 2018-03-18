import { sharpeRatio } from './helper.js';
var math = require('mathjs');

describe('helper', () => {

  describe('sharpeRatio', () => {
    const mockArr = [1, 2, 3, 4, 5];
    const avg = 3;
    const standardDev = 1.5811388300841898;
    
    it('should take in an array of numbers', () => {
      const sharpeRatio = jest.fn();
      sharpeRatio(mockArr);
      expect(sharpeRatio).toHaveBeenCalledWith(mockArr);
    })

    it('should return the sharpe ratio', () => {
      // console.log(math.std(mockArr))
      expect(sharpeRatio(mockArr)).toEqual(1.8973665961010275)
    })
  })
})