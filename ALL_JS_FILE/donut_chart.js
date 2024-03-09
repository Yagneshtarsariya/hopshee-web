google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Status', 'Appoinment'],
        ['Pending', 11],
        ['Approved', 2],
        ['Reject', 2]
        // ['Watch TV', 2],
        // ['Sleep', 7]
    ]);

    var options = {
        title: 'Appoinment status',
        pieHole: 0.2,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}