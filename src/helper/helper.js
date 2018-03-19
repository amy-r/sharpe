var math = require('mathjs');

export const sharpeRatio = (arrOfRtrns) => {
  if (arrOfRtrns.length) {
    const sharpe = (math.mean(arrOfRtrns) / math.std(arrOfRtrns))
    return sharpe 
  }
  else return 'none found'
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

export const createReturns = (closes) => {

  const allRtrns = closes.map( (arrofCloses, i) => {

    const rtrns = arrofCloses.reduce( (rtrnsArr, closeArr, i) => {
      const ret = ((arrofCloses[i+1] - arrofCloses[i])/arrofCloses[i])
      return [...rtrnsArr, ret]  
      }, [])

      return rtrns.filter(Boolean)
  });

  return allRtrns
}

export const getData = async (url) => {
  const fetched = await fetchApi(url)
 
  const allCloses = fetched.year.map( year => year.closes )
  const allRtrns = createReturns(allCloses);
  const allSharpes = allRtrns.map( (rtn) => {
    return sharpeRatio(rtn)
  });
  
  const currencyNames = fetched.year.map( year => year.currency )
  const currencyRtrns = {};

  currencyNames.forEach( (name, i) => currencyRtrns[name] = allSharpes[i]);
  console.log(currencyRtrns)
  return currencyRtrns
}

