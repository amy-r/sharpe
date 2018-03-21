import { sharpeRatio, fetchApi, createReturns, getData } from './helper.js';
import { mockDay, mockWeek,mockMonth, mockYear, mockCloses, mockReturns, mockFetched } from './mockData.js'
var math = require('mathjs');

describe('helper', () => {

  describe('sharpeRatio', () => {
    const mockArr = [1, 2, 3, 4, 5];
    const avg = 3;
    const standardDev = 1.5811388300841898;

    it('should take in an array of numbers', () => {
      const sharpeRatio = jest.fn();
      sharpeRatio(mockArr);
      expect.arrayContaining(mockArr);
    })

    it('should return the sharpe ratio', () => {
      expect(sharpeRatio(mockArr)).toEqual(1.8973665961010275)
    })
  })

  describe('fetchApi', () => {
    
    let url

    beforeAll(() => {
      url = 'https://api.nomics.com/v0/sparkline'

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ 
            day: mockDay,
            week: mockWeek,
            month: mockMonth,
            year: mockYear 
          })
        })
      )
    })

    it('calls fetch with the correct params', () => {
      const expectParams = ['https://api.nomics.com/v0/sparkline']
      expect(window.fetch).not.toHaveBeenCalled();

      fetchApi(url)
      expect(window.fetch).toHaveBeenCalledWith(...expectParams)
    })

    it('returns a response object', async () => {
      const response = await fetchApi(url)
      const expected = {  
        day: mockDay,          
        week: mockWeek,
        month: mockMonth,
        year: mockYear
      }
      expect(response).toEqual(expected)
    })

    it('should throw an error if the response is not okay', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 500,   
        })
      )

      expect(fetchApi(url)).rejects.toEqual(Error('Could not get data'))
    })
  })

  describe('createReturns', () => {

    it('should take in an array of arrays', () => {
      createReturns(mockCloses);
      expect.arrayContaining(mockCloses)    
    })

    it('should return an array of returns', () => {
      const expectedReturns = [
        [1, 0.5, 0.3333333333333333, 0.25],
        [1, 0.5, 0.3333333333333333, 0.25]
      ]
      expect(createReturns(mockCloses)).toEqual(expectedReturns)
    })
  })

  describe('getData', () => {
    it('should take in fetchedData and return an object with currency returns', () => {
      expect(getData(mockFetched)).toEqual(mockReturns)
    })
  })
})