// algorithms/activitySelection.js
const activitySelection = (activities) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Sort activities by finish time',
    'Select first activity',
    'For each remaining activity:',
    '  if start time >= finish time of last selected',
    '    select this activity'
  ];

  // Sort activities by finish time
  const explanation1 = 'Sorting activities by finish time';
  steps.push({
    activities: [...activities],
    selected: [],
    currentIndex: -1,
    comparingIndices: null,
    currentLine: 1,
    action: 'sort'
  });
  explanations.push(explanation1);

  const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);
  
  const explanation2 = 'Selecting first activity';
  steps.push({
    activities: [...sortedActivities],
    selected: [0],
    currentIndex: 0,
    comparingIndices: null,
    currentLine: 2,
    action: 'select-first'
  });
  explanations.push(explanation2);

  const selected = [0];
  let lastSelected = 0;

  // Select activities
  for (let i = 1; i < sortedActivities.length; i++) {
    const explanation3 = `Checking activity ${i}: start=${sortedActivities[i].start}, finish=${sortedActivities[i].finish}`;
    steps.push({
      activities: [...sortedActivities],
      selected: [...selected],
      currentIndex: i,
      comparingIndices: [lastSelected, i],
      currentLine: 3,
      action: 'check-activity'
    });
    explanations.push(explanation3);

    if (sortedActivities[i].start >= sortedActivities[lastSelected].finish) {
      selected.push(i);
      lastSelected = i;

      const explanation4 = `Activity ${i} selected (start >= finish of last selected)`;
      steps.push({
        activities: [...sortedActivities],
        selected: [...selected],
        currentIndex: i,
        comparingIndices: null,
        currentLine: 4,
        action: 'select-activity'
      });
      explanations.push(explanation4);
    } else {
      const explanation5 = `Activity ${i} not selected (conflict with last selected)`;
      steps.push({
        activities: [...sortedActivities],
        selected: [...selected],
        currentIndex: i,
        comparingIndices: null,
        currentLine: 4,
        action: 'skip-activity'
      });
      explanations.push(explanation5);
    }
  }

  // Final result
  const finalExplanation = `Selected ${selected.length} activities: ${selected.map(i => sortedActivities[i].name).join(', ')}`;
  steps.push({
    activities: [...sortedActivities],
    selected: [...selected],
    currentIndex: -1,
    comparingIndices: null,
    currentLine: 5,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = activitySelection;