var math = require('mathjs');

export const sharpeRatio = (arrOfRtrns) => {
  const sharpe = (math.mean(arrOfRtrns) / math.std(arrOfRtrns))
  return sharpe
}

export const fetchApi = async (url) => {
  try {
    const response = await fetch(url);

    if (response.status <= 200) {
      return await response.json()
    } else {
      throw new Error('Bad status code')
    }  
  }  catch(err) {
    throw new Error('Could not get data')
  }
}