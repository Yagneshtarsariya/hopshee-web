const axios = require('axios');
const { google } = require('google-charts');

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    try {
        const pendingData = await axios.get('https://node-hophsee.onrender.com/appoinments/upcoming');
        const approvedData = await axios.get('https://node-hophsee.onrender.com/appoinments/approved');
        const rejectData = await axios.get('https://node-hophsee.onrender.com/appoinments/cancelled');
        const rexpireddata = await axios.get('https://node-hophsee.onrender.com/appoinments/expired');

        const pendingCount = pendingData.data.length;
        const approvedCount = approvedData.data.length;
        const rejectCount = rejectData.data.length;
        const rexpiredCount = rexpireddata.data.length;

        var data = google.visualization.arrayToDataTable([
            ['Status', 'Appoinment'],
            ['Pending', 1],
            ['Approved', 1],
            ['Reject', 1],
            ['expired', expiredCount]
        ]);

        var options = {
            title: 'Appoinment status',
            pieHole: 0.2,
        };
        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
