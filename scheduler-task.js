const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function scheduler(activities) {
    const unsortedActivities = Array.from(activities);
		
		activities.sort((a, b) => a.start - b.start  || a.end - b.end);
    let loraineEnd = -1;
    let charlesEnd = -1;
    let assignment = [];

    for (let activity of activities) {
        const { start, end } = activity;
				const resultPosition = unsortedActivities.indexOf(activity);

        if (start >= charlesEnd) {
					assignment.splice(resultPosition, 0, 'C');
            charlesEnd = end;
        } else if (start >= loraineEnd) {
						assignment.splice(resultPosition, 0, 'J');
            loraineEnd = end;
        } else {
            return "IMPOSSIBLE";
        }
    }

    return assignment.join('');
}

// Processing each test case
function processTestCases(testCases) {
    let results = [];

    for (let i = 0; i < testCases.length; i++) {
        const activities = testCases[i];
        const result = scheduler(activities);
        results.push(`Case #${i + 1}: ${result}`);
    }

    return results;
}

// Main function
function main() {
    let testCases = [];
    let currentTestCase = [];
    let numberOfTestCases = 0;
    let numberOfActivities = 0;
    let currentActivityCount = 0;

    rl.question('Enter the number of test cases, T: ', (testCount) => {
        numberOfTestCases = parseInt(testCount);

        const readActivity = () => {
            rl.question('', (line) => {
                if (currentActivityCount === 0) {
                    // Reading the number of activities for the current test case
                    numberOfActivities = parseInt(line);
                    currentActivityCount++;
                    readActivity();
                } else {
                    // Reading an activity's start and end time
                    const [start, end] = line.split(' ').map(Number);
                    currentTestCase.push({ start, end });
                    currentActivityCount++;

                    if (currentActivityCount > numberOfActivities) {
                        testCases.push(currentTestCase);
                        currentTestCase = [];
                        currentActivityCount = 0;
                    }

                    if (testCases.length < numberOfTestCases) {
                        readActivity();
                    } else {
                        // All test cases are read, process them
                        const results = processTestCases(testCases);
                        results.forEach(result => console.log(result));
                        rl.close();
                    }
                }
            });
        };

        readActivity();
    });
}

main();
