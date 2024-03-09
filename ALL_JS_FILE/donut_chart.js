// google.charts.load("current", { packages: ["corechart"] });
// google.charts.setOnLoadCallback(drawChart);
// function drawChart() {
//     var data = google.visualization.arrayToDataTable([
//         ['Status', 'Appoinment'],
//         ['Pending', 11],
//         ['Approved', 2],
//         ['Reject', 2]
//     ]);

//     var options = {
//         title: 'Appoinment status',
//         pieHole: 0.2,
//     };

//     var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
//     chart.draw(data, options);
// }

const axios = require('axios');
const { google } = require('google-charts');

google.charts.load('current', { packages: ['corechart'] });

async function fetchData() {
    try {
        const pendingData = await axios.get('https://node-hophsee.onrender.com/appoinments/upcoming');
        const approvedData = await axios.get('https://node-hophsee.onrender.com/appoinments/approved');
        const rejectData = await axios.get('https://node-hophsee.onrender.com/appoinments/cancelled');
        const rexpireddata = await axios.get('https://node-hophsee.onrender.com/appoinments/rexpired');


        // Extract data from API responses
        const pendingCount = pendingData.data.length;
        const approvedCount = approvedData.data.length;
        const rejectCount = rejectData.data.length;
        const rexpiredCount = rexpireddata.data.length;

        // Create the data table
        const data = google.visualization.arrayToDataTable([
            ['Status', 'Appoinment'],
            ['upcoming', pendingCount],
            ['Approved', approvedCount],
            ['cancal', rejectCount],
            ['expored', rexpiredCount]
        ]);

        // Set chart options
        const options = {
            title: 'Appoinment status',
            pieHole: 0.2,
        };

        // Draw the chart
        const chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Set callback to draw chart when Google Charts is loaded
google.charts.setOnLoadCallback(fetchData);
