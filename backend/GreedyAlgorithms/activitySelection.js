// algorithms/activitySelection.js - Updated with better step data

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
  const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);
  
  steps.push({
    activities: [...sortedActivities],
    selected: [],
    currentIndex: -1,
    comparingIndices: [],
    action: 'sort',
    message: 'Sorting activities by finish time...'
  });
  explanations.push('Sorting activities by finish time');

  // Select first activity
  const selected = [0];
  
  steps.push({
    activities: [...sortedActivities],
    selected: [...selected],
    currentIndex: 0,
    comparingIndices: [],
    action: 'select-first',
    message: `Selecting first activity: ${sortedActivities[0].name} (${sortedActivities[0].start}-${sortedActivities[0].finish})`
  });
  explanations.push(`Selected first activity: ${sortedActivities[0].name}`);

  let lastSelected = 0;

  // Select activities
  for (let i = 1; i < sortedActivities.length; i++) {
    // Show comparison step
    steps.push({
      activities: [...sortedActivities],
      selected: [...selected],
      currentIndex: i,
      comparingIndices: [lastSelected, i],
      action: 'check-activity',
      message: `Checking if ${sortedActivities[i].name} (${sortedActivities[i].start}-${sortedActivities[i].finish}) can be selected...`
    });
    explanations.push(`Checking activity ${i}: start=${sortedActivities[i].start}, finish=${sortedActivities[i].finish}`);

    if (sortedActivities[i].start >= sortedActivities[lastSelected].finish) {
      selected.push(i);
      lastSelected = i;
      
      steps.push({
        activities: [...sortedActivities],
        selected: [...selected],
        currentIndex: i,
        comparingIndices: [],
        action: 'select-activity',
        message: `✓ Selected ${sortedActivities[i].name}! (${sortedActivities[i].start}-${sortedActivities[i].finish})`
      });
      explanations.push(`Activity ${i} selected (start >= finish of last selected)`);
    } else {
      steps.push({
        activities: [...sortedActivities],
        selected: [...selected],
        currentIndex: i,
        comparingIndices: [],
        action: 'skip-activity',
        message: `✗ Skipped ${sortedActivities[i].name} - conflicts with selected activity`
      });
      explanations.push(`Activity ${i} not selected (conflict with last selected)`);
    }
  }

  // Final result
  const selectedNames = selected.map(i => sortedActivities[i].name).join(', ');
  steps.push({
    activities: [...sortedActivities],
    selected: [...selected],
    currentIndex: -1,
    comparingIndices: [],
    action: 'complete',
    message: `✅ Activity selection complete! Selected ${selected.length} activities: ${selectedNames}`,
    result: { selected, activities: sortedActivities }
  });
  explanations.push(`Selected ${selected.length} activities: ${selectedNames}`);

  return { steps, pseudocode, explanations };
};

module.exports = activitySelection;