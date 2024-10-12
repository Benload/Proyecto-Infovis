// Dummy data - replace with actual data later
const data = {
    totalGoals: 701,
    clubGoals: [
        { name: "Manchester United", goals: 145 },
        { name: "Real Madrid", goals: 450 },
        { name: "Juventus", goals: 101 },
        { name: "Al Nassr", goals: 5 }
    ],
    yearGoals: [
        { year: 2023, goals: 5 },
        { year: 2022, goals: 32 },
        { year: 2021, goals: 47 },
        { year: 2020, goals: 44 }
    ],
    goalTypes: [
        { type: "Right foot", goals: 400 },
        { type: "Left foot", goals: 150 },
        { type: "Header", goals: 125 },
        { type: "Other", goals: 26 }
    ]
};

document.getElementById('totalGoals').textContent = data.totalGoals;

function populateList(elementId, data, propertyName) {
    const list = document.getElementById(elementId);
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item[propertyName]}: ${item.goals}`;
        list.appendChild(li);
    });
}

populateList('clubGoals', data.clubGoals, 'name');
populateList('yearGoals', data.yearGoals, 'year');
populateList('goalTypes', data.goalTypes, 'type');





