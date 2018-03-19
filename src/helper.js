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

export const cleanData = async (results) => {
  const fetched = await fetchApi('https://api.nomics.com/v0/sparkline')
  const yearData = fetched.year

  const allCloses = yearData.map( year => year.closes )

  const currencyNames = yearData.map( year => year.currency )

  const allRtrns = allCloses.map( (arrofCloses, i) => {
    let newArr = [];

    for (i=0; i< arrofCloses.length; i++) {
      const ret = (arrofCloses[i+1] - arrofCloses[i]) /arrofCloses[i]
      newArr.push(ret) 
    }

    return newArr
  });

  const clean = allRtrns.map(rtrn => rtrn.filter(Boolean))
  const allSharpes = clean.map( (rtn) => {
    return sharpeRatio(rtn)
  });
  
  const currencyRtrns = {};
  currencyNames.forEach( (name, i) => currencyRtrns[name] = allSharpes[i]);
}

