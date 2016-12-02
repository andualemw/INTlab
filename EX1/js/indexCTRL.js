// var myApp = angular.module('myApp',['ngAnimate', 'ngSanitize', 'ui.bootstrap']),
var myApp = angular.module('myApp',[]),
    width = 300,
    height = 400;

myApp.run(function($http){
        d3.csv('./data/DBfiles/grades-data.csv',function(dataSet) {
            var svg = d3.select("body").select("p");
            console.log(svg);
            var axisScale = d3.scaleLinear()
                        .domain([0, 100])
                        .range([0, 400]);

var xAxis = d3.axisBottom()
                 .scale(axisScale);
var xAxisGroup = svg.append("g")            
                  .call(xAxis);
            console.log(dataSet);
            
            svg
                .insert("svg")
                .attr("width",'100%')
                .attr("length", "400")
                .style("background", "EEEEEE")
            .selectAll("circle")
            .data(dataSet)
            .enter()
            .append("circle")
                .attr("r", 1)
                .attr("cx", function(ds, i){
                    return((i+1)*40);
                })
                .attr("cy", function(ds){
                    return(ds.finalGrade);
                })
                .attr("fill", function(ds){
                    return(d3.interpolateMagma(Math.random()));
                })
                .attr("fill-opacity", function(ds, i){
                    return(ds.finalGrade * 0.01)
                })
                .transition()
                .delay(100)
                .attr("r", 60)
                .duration(1000)
                .attr("r", 10)
                .text(function(t){
                    return (t.firstName);
                });
        });

        $( document ).tooltip({
            tooltipClass: "custom-tooltip-styling"
        });
})
myApp.controller('mainCTRL', function ($scope, $http) { 
    
    
    // $scope.alert = function(result){
    //     console.log(result);
    //     if(result == '')
    //         return;
    //     else if(result.search('not') == -1)
    //         return('alert alert-success');
    //     else
    //         return('alert alert-danger')
    // }

    // $scope.search = function(searchText){
    //     $scope.word = searchText;
    //     $scope.result1 = '"'+searchText+'"' + ' not found in song 1';
    //     $scope.result2 = '"'+searchText+'"' + ' not found in song 2';
    //     $scope.subResult = {};
    //     wordsArry.forEach(function(line){
    //         // console.log(line[0]);
    //         if(line[0] == searchText){
    //             // $scope.result = 'found!';
    //             song1 = line[1].split("");
    //             song2 = line[3].split("");
    //             console.log(song1);
    //             console.log(song2);
    //             if(line[1] == '000')
    //                 console.log($scope.result1);
    //             else {
    //                 $scope.result1 = '"'+searchText+'"' + ' found in song 1 in section: ';
    //                 for(i = 0 ; i < 3 ; i++)
    //                     if(song1[i] != '0')
    //                         $scope.result1 += ('\n')+(i+1);
    //                 console.log($scope.result1);
    //             } 
    //             if(line[3] == '000')
    //                 console.log($scope.result2);
    //             else {
    //                 $scope.result2 = '"'+searchText+'"' + ' found in song 2 in section: ';
    //                 for(i = 0 ; i < 3 ; i++)
    //                     if(song2[i] != '0')
    //                         $scope.result2 += ('\n')+(i+1);
    //                 console.log($scope.result1);
    //             }
    //         }
    //         return;
    //     });
    // }   
});
