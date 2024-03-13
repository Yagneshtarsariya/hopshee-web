
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart(upcoming,approved,cancelled,expired) {
    var data = google.visualization.arrayToDataTable([
        ['Status', 'Appointments'],
        ['Upcoming', upcoming],
        ['Approved', approved],
        ['Cancelled', cancelled],
        ['Expired', expired]
    ]);

    var options = {
        title: 'Appointment Status',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
