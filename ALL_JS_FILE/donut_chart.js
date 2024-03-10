google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Status', 'Numbers'],
        ['Upcoming', 11],
        ['Approved', 2],
        ['Cancal', 2],
        ['Expirerd', 2]
    ]);

    var options = {
        title: 'Appoinement Status',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}