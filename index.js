var profitObjectInDollar = {
    T: 1500,
    P: 1000,
    C: 3000,
  };
  
  var timeTakenObject = {
    T: 5,
    P: 4,
    C: 10,
  };
  
  var earnings = 0;
  
  var proportionArray = [];
  let proportionOject = { T: 0, P: 0, C: 0, earnings: 0 };
  
  function proportionArrayModification(asset, n, i) {
    let remainingTime = n - timeTakenObject[asset];
    n = remainingTime;
    !proportionArray.length && proportionArray.push({ ...proportionOject });
    proportionArray[i][asset] = proportionArray[i][asset] + 1;
    proportionArray[i]['earnings'] =
      proportionArray[i]['earnings'] +
      profitObjectInDollar[asset] * remainingTime;
    maxProfit(n, i);
  }
  
  function maxProfit(n, i) {
    if (n > 15) {
      proportionArrayModification('C', n, i);
    } else if (n > 7 && n < 15) {
      proportionArrayModification('T', n, i);
    } else if (n >= 4 && n < 7) {
      proportionArrayModification('P', n, i);
    } else if (n === 15 || n == 7) {
      let possibleAssets = n == 15 ? ['C', 'T'] : ['T', 'P'];
      let tempProportionOject;
      tempProportionOject = proportionArray[i]
        ? { ...proportionArray[i] }
        : { ...proportionOject };
      possibleAssets.map((asset, index) => {
        let k = i + index;
        let remainingTime =
          n === 15 ? 15 - timeTakenObject[asset] : 7 - timeTakenObject[asset];
        let time = remainingTime;
        !proportionArray[k] && proportionArray.push({ ...tempProportionOject });
        proportionArray[k]['earnings'] =
          proportionArray[k]['earnings'] +
          profitObjectInDollar[asset] * remainingTime;
        proportionArray[k][asset] = proportionArray[k][asset] + 1;
        maxProfit(time, k);
      });
    }
  }
  
  maxProfit(7, 0);
  
  proportionArray.sort((a, b) => b.earnings - a.earnings);
  
  let maximumEarnings = proportionArray[0]['earnings'];
  console.log(`maximum Earnings = $${maximumEarnings}`);
  
  let outputArray = proportionArray.filter(
    (value) => value.earnings === maximumEarnings
  );
  
  outputArray.map((value, index) => {
    console.log(`${index + 1}. T: ${value.T} P: ${value.P} C: ${value.C}`);
  });