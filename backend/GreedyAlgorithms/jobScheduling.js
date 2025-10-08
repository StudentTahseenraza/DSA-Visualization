// algorithms/jobScheduling.js
const jobScheduling = (jobs) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Sort jobs by profit in descending order',
    'Initialize result array with null slots',
    'For each job in sorted list:',
    '  Find latest available slot before deadline',
    '  If slot found, place job in that slot'
  ];

  // Sort jobs by profit (descending)
  const explanation1 = 'Sorting jobs by profit in descending order';
  steps.push({
    jobs: [...jobs],
    schedule: Array(Math.max(...jobs.map(j => j.deadline))).fill(null),
    currentIndex: -1,
    currentLine: 1,
    action: 'sort'
  });
  explanations.push(explanation1);

  const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);
  const maxDeadline = Math.max(...sortedJobs.map(j => j.deadline));
  const schedule = Array(maxDeadline).fill(null);
  let totalProfit = 0;

  const explanation2 = `Initializing schedule with ${maxDeadline} slots`;
  steps.push({
    jobs: [...sortedJobs],
    schedule: [...schedule],
    totalProfit: totalProfit,
    currentIndex: -1,
    currentLine: 2,
    action: 'initialize'
  });
  explanations.push(explanation2);

  // Schedule jobs
  for (let i = 0; i < sortedJobs.length; i++) {
    const job = sortedJobs[i];
    
    const explanation3 = `Processing job: ${job.id} (profit: ${job.profit}, deadline: ${job.deadline})`;
    steps.push({
      jobs: [...sortedJobs],
      schedule: [...schedule],
      totalProfit: totalProfit,
      currentIndex: i,
      currentLine: 3,
      action: 'process-job'
    });
    explanations.push(explanation3);

    // Find available slot
    for (let j = job.deadline - 1; j >= 0; j--) {
      const explanation4 = `Checking slot ${j} for job ${job.id}`;
      steps.push({
        jobs: [...sortedJobs],
        schedule: [...schedule],
        totalProfit: totalProfit,
        currentIndex: i,
        checkingSlot: j,
        currentLine: 4,
        action: 'check-slot'
      });
      explanations.push(explanation4);

      if (schedule[j] === null) {
        schedule[j] = job.id;
        totalProfit += job.profit;

        const explanation5 = `Scheduled job ${job.id} in slot ${j}`;
        steps.push({
          jobs: [...sortedJobs],
          schedule: [...schedule],
          totalProfit: totalProfit,
          currentIndex: i,
          checkingSlot: j,
          currentLine: 5,
          action: 'schedule-job'
        });
        explanations.push(explanation5);
        break;
      }
      
      if (j === 0) {
        const explanation6 = `No available slot for job ${job.id}`;
        steps.push({
          jobs: [...sortedJobs],
          schedule: [...schedule],
          totalProfit: totalProfit,
          currentIndex: i,
          checkingSlot: -1,
          currentLine: 4,
          action: 'no-slot'
        });
        explanations.push(explanation6);
      }
    }
  }

  // Final result
  const finalExplanation = `Scheduling complete! Total profit: ${totalProfit}`;
  steps.push({
    jobs: [...sortedJobs],
    schedule: [...schedule],
    totalProfit: totalProfit,
    currentIndex: -1,
    currentLine: 5,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = jobScheduling;