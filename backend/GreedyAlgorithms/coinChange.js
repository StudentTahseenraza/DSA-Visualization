// algorithms/coinChangeGreedy.js
const coinChangeGreedy = (coins, amount) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Sort coins in descending order',
    'Initialize result array',
    'For each coin in sorted list:',
    '  While amount >= coin:',
    '    Subtract coin from amount',
    '    Add coin to result'
  ];

  // Sort coins in descending order
  const explanation1 = 'Sorting coins in descending order';
  steps.push({
    coins: [...coins],
    amount: amount,
    result: [],
    currentCoin: -1,
    currentLine: 1,
    action: 'sort-coins'
  });
  explanations.push(explanation1);

  const sortedCoins = [...coins].sort((a, b) => b - a);
  const result = [];
  let remaining = amount;

  const explanation2 = 'Initializing result array';
  steps.push({
    coins: [...sortedCoins],
    amount: amount,
    result: [...result],
    remaining: remaining,
    currentCoin: -1,
    currentLine: 2,
    action: 'initialize'
  });
  explanations.push(explanation2);

  // Greedy coin selection
  for (let i = 0; i < sortedCoins.length; i++) {
    const coin = sortedCoins[i];
    
    const explanation3 = `Processing coin: ${coin}`;
    steps.push({
      coins: [...sortedCoins],
      amount: amount,
      result: [...result],
      remaining: remaining,
      currentCoin: coin,
      currentLine: 3,
      action: 'process-coin'
    });
    explanations.push(explanation3);

    while (remaining >= coin) {
      const explanation4 = `Using coin ${coin} (remaining: ${remaining})`;
      steps.push({
        coins: [...sortedCoins],
        amount: amount,
        result: [...result],
        remaining: remaining,
        currentCoin: coin,
        currentLine: 4,
        action: 'use-coin'
      });
      explanations.push(explanation4);

      remaining -= coin;
      result.push(coin);

      const explanation5 = `Added coin ${coin}, new remaining: ${remaining}`;
      steps.push({
        coins: [...sortedCoins],
        amount: amount,
        result: [...result],
        remaining: remaining,
        currentCoin: coin,
        currentLine: 5,
        action: 'add-coin'
      });
      explanations.push(explanation5);
    }

    if (remaining === 0) break;
  }

  // Final result
  const finalExplanation = remaining === 0 ? 
    `Coin change complete! Used ${result.length} coins: ${result.join(', ')}` :
    `Cannot make exact change! Remaining: ${remaining}`;
  
  steps.push({
    coins: [...sortedCoins],
    amount: amount,
    result: [...result],
    remaining: remaining,
    currentCoin: -1,
    currentLine: 6,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = coinChangeGreedy;