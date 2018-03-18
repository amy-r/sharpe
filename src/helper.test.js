import { sharpeRatio, fetchApi } from './helper.js';
import {mockDay, mockWeek,mockMonth, mockYear} from './mockData.js'
var math = require('mathjs');

describe('helper', () => {
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
})
