var myApp = angular.module('myApp',[]);

myApp.run(function($http){
        var dataArr = [];
        function drawChart() {
            $http.get('grades-data.csv').success(function(data){
            dataArr = data;

        var dataArr = google.visualization.DataTable();
        dataArr.addColumn('string', 'Pizza');
      dataArr.addColumn('number', 'Populartiy');
      dataArr.addRows([
        ['Pepperoni', 33],
        ['Hawaiian', 26],
        ['Mushroom', 22],
        ['Sausage', 10], // Below limit.
        ['Anchovies', 9] // Below limit.
      ]);


        })


        var options = {
            title: 'Grades'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(dataArr, options);
        }
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
})