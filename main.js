// Datos del archivo JSON
const data = {
    clubes: {
        "Real Madrid": 450,
        "Juventus FC": 101,
        "Al-Nassr FC": 9,
        "Sporting CP": 5,
        "Manchester United": 145
    },
    anos: {
        "2002": 5,
        "2003": 1,
        "2004": 6,
        "2005": 13,
        "2006": 19,
        "2007": 29,
        "2008": 34,
        "2009": 29,
        "2010": 45,
        "2011": 53,
        "2012": 58,
        "2013": 59,
        "2014": 56,
        "2015": 54,
        "2016": 42,
        "2017": 42,
        "2018": 43,
        "2019": 25,
        "2020": 41,
        "2021": 34,
        "2022": 13,
        "2023": 9
    },
    tipos_goles: {
        "penales": 132,
        "cabeza": 112,
        "pie_derecho": 253,
        "pie_izquierdo": 113,
        "tiros_libres": 58,
        "in_game": 520
    },
    ligas: {
        "FA Cup": 13,
        "Liga Portugal": 3,
        "UEFA Super Cup": 2,
        "Supercoppa Italiana": 2,
        "LaLiga": 311,
        "Saudi Pro League": 9,
        "FIFA Club World Cup": 7,
        "Italy Cup": 4,
        "Premier League": 103,
        "Europa League": 2,
        "Taca de Portugal Placard": 2,
        "EFL Cup": 4,
        "Supercopa": 4,
        "Copa del Rey": 22,
        "UEFA Champions League": 140,
        "Serie A": 81
    }
};


function showYearGoalsGraph() {
    const anos = Object.keys(data.anos);
    const golesPorAno = Object.values(data.anos);

    const traceAnoBarras = {
        y: anos,
        x: golesPorAno,
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(54, 162, 235, 0.6)',
        }
    };

    const layoutAnoBarras = {
        title: 'Goles por Año (2002-2023)',
        yaxis: { title: 'Año' },
        xaxis: { title: 'Goles' },
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: { color: '#ffffff' },
        bargap: 0.2
    };

    Plotly.newPlot('yearGoalsGraph', [traceAnoBarras], layoutAnoBarras);
}
document.addEventListener('DOMContentLoaded', function () {
    showYearGoalsGraph();
});


function fillClubGoals() {
    const clubList = document.getElementById('clubGoals');
    for (const club in data.clubes) {
        const li = document.createElement('li');
        li.textContent = `${club}: ${data.clubes[club]} goles`;
        clubList.appendChild(li);
    }
}


function fillGoalTypes() {
    const typeList = document.getElementById('goalTypes');
    for (const type in data.tipos_goles) {
        const li = document.createElement('li');
        li.textContent = `${type}: ${data.tipos_goles[type]} goles`;
        typeList.appendChild(li);
    }
}

function fillGoalLeagues() {
    const leagueList = document.getElementById('goalLeagues');
    for (const league in data.ligas) {
        const li = document.createElement('li');
        li.textContent = `${league}: ${data.ligas[league]} goles`;
        leagueList.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fillClubGoals();
    fillGoalTypes();
    fillGoalLeagues();
});

