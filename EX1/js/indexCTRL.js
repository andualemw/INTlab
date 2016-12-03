var myApp = angular.module('myApp',[]),
    width = 600,
    height = 400;

myApp.run(function($http){
        d3.csv('./data/DBfiles/grades-data.csv',function(dataSet) {
           
            var widthScale = d3.scaleLinear()
                            .domain([0, dataSet.length])
                            .range([0,width]);
           
            var xAxis = d3.axisBottom()
                        .scale(widthScale);
           
            var canvas = d3.select("body").select("p")
                        .insert("svg")
                        .attr("width","1000")
                        .attr("length", "1000")
                        .style("background", "EEEEEE");
                        
                canvas.append("g")
                        .attr("transform", "translate(20,10)");
                        

                canvas.append("g")
                        .attr("transform", "translate(0,0)")
                        .call(xAxis);

            // set the ranges
// var x = d3.scaleTime().range([1, width]);
// var y = d3.scaleLinear().range([height, 1]);


// canvas.append("g")
//       .call(d3.axisLeft(y));

//             var valueline = d3.line()
//                             .x(function(ds, i) { return x(i); })
//                             .y(function(ds, i) { return y(ds.finalGrade); });
            
// canvas.append("path")
//       .data([dataSet])
//       .attr("class", "line")
//       .attr("d", valueline);

            var circle = canvas.selectAll("circle")
                        .data(dataSet)
                        .enter()
                        .append("circle")
                        .attr("r", 1)
                        .attr("cx", function(ds, i){return(widthScale(i));})
                        .attr("cy", function(ds){return(ds.finalGrade);})
                        .attr("fill", function(ds){return(d3.interpolateMagma(Math.random()));})
                        .attr("fill-opacity", function(ds, i){return(ds.finalGrade * 0.01)})
                        .transition()
                        .duration(1000)
                        .attr("r", 8)
                        .attr("transform", "translate(20,30)");


 
        });

        $( document ).tooltip({
            tooltipClass: "custom-tooltip-styling"
        });
})
myApp.controller('mainCTRL', function ($scope, $http) { 

});
