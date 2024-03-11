// google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Charts library is loaded
google.charts.setOnLoadCallback(fetchAndDrawDonutChart);

// Function to fetch data and draw the donut chart
function fetchAndDrawDonutChart() {
    // Make fetch requests to fetch data for each API
    var apiEndpoints = [
        'AppoApproved',
        'Appoupcoming',
        'Appocancelled',
        'Appoexpired'
    ];

    var promises = apiEndpoints.map(function (endpoint) {
        return fetch(endpoint)
            .then(response => response.json());
    });

    // Use Promise.all to wait for all API requests to complete
    Promise.all(promises)
        .then(function (results) {
            // Extract the lengths of data from each API response
            var dataLengths = results.map(function (result) {
                return result.length;
            });

            // Draw the donut chart
            drawDonutChart(dataLengths);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

// Function to draw the donut chart
function drawDonutChart(dataLengths) {
    // Convert data to the format required by Google Charts
    var chartData = new google.visualization.arrayToDataTable([
        ['Status', 'Numbers'],
        ['Upcoming', dataLengths[0]],
        ['Approved', dataLengths[1]],
        ['Cancel', dataLengths[2]],
        ['Expired', dataLengths[3]]
    ]);

    // Set chart options
    var options = {
        title: 'Appointment Status',
        pieHole: 0.4,
    };

    // Instantiate and draw the chart
    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(chartData, options);
}