let startTime, endTime;
let isWaiting = false;
const target = document.getElementById('target');
const nameInput = document.getElementById('name');
const results = document.getElementById('results');
const message = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const exportBtn = document.getElementById('exportBtn');
const ctx = document.getElementById('reactionTimeChart').getContext('2d');
let chart;

startBtn.addEventListener('click', startTest);
target.addEventListener('click', handleTargetClick);
exportBtn.addEventListener('click', exportToCSV);

function handleTargetClick() {
    if (isWaiting) {
        endTest();
    }
}

function startTest() {
    if (nameInput.value.trim() === '') {
        message.textContent = 'Please enter your name first.';
        message.className = 'mt-3 text-center text-danger';
        return;
    }
    
    message.textContent = '';
    target.style.backgroundColor = '#dc3545';
    target.style.color = 'white';
    target.textContent = 'Wait for green...';
    isWaiting = true;
    startBtn.disabled = true;
    
    const delay = Math.floor(Math.random() * 4000) + 1000; // Random delay between 1-5 seconds
    setTimeout(() => {
        target.style.backgroundColor = '#198754';
        target.style.color = 'white';
        target.textContent = 'Click now!';
        startTime = new Date().getTime();
    }, delay);
}

function endTest() {
    if (!startTime) return; // Clicked too early
    
    endTime = new Date().getTime();
    const reactionTime = endTime - startTime;
    isWaiting = false;
    
    target.style.backgroundColor = '#0d6efd';
    target.style.color = 'white';
    target.textContent = `Your time: ${reactionTime}ms`;
    message.textContent = 'Click "Start Test" to try again.';
    message.className = 'mt-3 text-center text-success';
    startBtn.disabled = false;
    
    saveResult(nameInput.value, reactionTime);
}

function saveResult(name, time) {
    fetch('/save-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, time }),
    })
    .then(() => updateResults());
}

function updateResults() {
    fetch('/results')
        .then(response => response.json())
        .then(data => {
            results.innerHTML = data.map(item => 
                `<tr><td>${item.name}</td><td>${item.time}</td></tr>`
            ).join('');
            updateChart(data);
        });
}

function exportToCSV() {
    fetch('/results')
        .then(response => response.json())
        .then(data => {
            const csvContent = "data:text/csv;charset=utf-8," 
                + "Name,Time (ms)\n"
                + data.map(item => `${item.name},${item.time}`).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "reaction_times.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}

function updateChart(data) {
    const labels = data.map((_, index) => `Attempt ${index + 1}`);
    const times = data.map(item => item.time);

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = times;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Reaction Time (ms)',
                    data: times,
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#212529'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Reaction Time (ms)',
                            color: '#212529'
                        },
                        ticks: {
                            color: '#212529'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Attempt',
                            color: '#212529'
                        },
                        ticks: {
                            color: '#212529'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

updateResults();