export const sharpeRatio = (arrOfRtrns) => {
  const sharpe = math.mean(arrOfRtrns) / math.std(arrOfRtrns)
  return sharpe
  //sharpe = math.mean(return) / math.std(return)
}