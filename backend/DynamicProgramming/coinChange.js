// algorithms/DynamicProgramming/coinChange.js
const coinChange = (coins, amount) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function coinChange(coins, amount):',
    '    dp = [infinity] * (amount + 1)',
    '    dp[0] = 0',
    '    for coin in coins:',
    '        for i from coin to amount:',
    '            dp[i] = min(dp[i], dp[i - coin] + 1)',
    '    return dp[amount] if dp[amount] != infinity else -1'
  ];

  if (amount < 0) {
    return {
      steps: [],
      explanations: ['Invalid input: amount must be non-negative'],
      pseudocode,
      finalResult: { error: true, message: 'Amount must be non-negative' }
    };
  }

  // Initialize DP array
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  // Track coin usage
  const usedCoin = Array(amount + 1).fill(-1);

  steps.push({
    dpTable: [...dp],
    coins: coins,
    amount: amount,
    currentAmount: 0,
    action: 'initialize',
    explanation: `Initializing dp array of size ${amount+1} with Infinity, dp[0] = 0`,
    currentLine: 2,
    usedCoin: [...usedCoin]
  });
  explanations.push(`DP array initialized`);

  // Fill DP array
  for (let coinIdx = 0; coinIdx < coins.length; coinIdx++) {
    const coin = coins[coinIdx];
    
    steps.push({
      dpTable: [...dp],
      coins: coins,
      amount: amount,
      currentCoin: coin,
      currentAmount: -1,
      action: 'new-coin',
      explanation: `Processing coin: ${coin}`,
      currentLine: 4,
      usedCoin: [...usedCoin]
    });
    explanations.push(`Using coin value: ${coin}`);

    for (let i = coin; i <= amount; i++) {
      if (dp[i - coin] + 1 < dp[i]) {
        const oldValue = dp[i];
        dp[i] = dp[i - coin] + 1;
        usedCoin[i] = coin;
        
        steps.push({
          dpTable: [...dp],
          coins: coins,
          amount: amount,
          currentCoin: coin,
          currentAmount: i,
          dependencyAmount: i - coin,
          action: 'update',
          explanation: `dp[${i}] updated: ${oldValue === Infinity ? '∞' : oldValue} → ${dp[i]} (using coin ${coin})`,
          currentLine: 5,
          usedCoin: [...usedCoin]
        });
        explanations.push(`Updated dp[${i}] = min(previous, dp[${i-coin}] + 1) = ${dp[i]}`);
      } else {
        steps.push({
          dpTable: [...dp],
          coins: coins,
          amount: amount,
          currentCoin: coin,
          currentAmount: i,
          dependencyAmount: i - coin,
          action: 'no-update',
          explanation: `dp[${i}] remains ${dp[i]} (current coin ${coin} doesn't improve)`,
          currentLine: 5,
          usedCoin: [...usedCoin]
        });
        explanations.push(`dp[${i}] unchanged at ${dp[i]}`);
      }
    }
  }

  const finalResult = dp[amount] !== Infinity ? dp[amount] : -1;
  
  // Reconstruct coin combination
  const coinCombination = [];
  if (finalResult !== -1) {
    let remaining = amount;
    while (remaining > 0) {
      const coin = usedCoin[remaining];
      if (coin === -1) break;
      coinCombination.push(coin);
      remaining -= coin;
    }
    coinCombination.reverse();
  }

  steps.push({
    dpTable: [...dp],
    coins: coins,
    amount: amount,
    currentAmount: amount,
    action: 'complete',
    explanation: finalResult !== -1 
      ? `Coin change complete! Minimum coins: ${finalResult}. Coins used: ${coinCombination.join(', ')}`
      : `Cannot make amount ${amount} with given coins`,
    currentLine: 6,
    coinCombination: coinCombination,
    finalResult: finalResult,
    final: true
  });
  explanations.push(finalResult !== -1 
    ? `Minimum ${finalResult} coin(s) needed` 
    : `Amount ${amount} cannot be formed`);

  return {
    steps,
    explanations,
    pseudocode,
    finalResult: {
      minCoins: finalResult,
      coinCombination: coinCombination,
      amount: amount
    },
    complexity: {
      time: {
        best: 'O(n × amount)',
        average: 'O(n × amount)',
        worst: 'O(n × amount)'
      },
      space: 'O(amount)',
      explanation: `Time complexity is O(n × amount) where n is number of coin denominations. Space complexity is O(amount) for the DP array.`
    },
    patternInsight: {
      overlappingSubproblems: `dp[i] depends on dp[i - coin] for each coin, showing overlapping subproblems`,
      optimalSubstructure: `Optimal solution for amount i uses optimal solution for amount i-coin`
    }
  };
};

module.exports = coinChange;