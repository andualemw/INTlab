var myApp = angular.module('myApp',[]);

myApp.run(function($http){
        d3.csv('./data/DBfiles/grades-data.csv',function(dataSet) {
           
            var margin = {top: 40, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            
            var x = d3.scaleLinear()
                    .range([0, width]);

            var y = d3.scaleLinear()
                    .range([height, 0]);
            
                x.domain([0, d3.max(dataSet, function(d,i) { return i+1; })]);
                y.domain([0, d3.max(dataSet, function(d) { return d.finalGrade; })]);
            
            var xAxis = d3.axisBottom()
                        .ticks(d3.max(dataSet, function(d,i) { return i+1; }))
                        .scale(x);

            var yAxis = d3.axisLeft().ticks(50)
                        .scale(y);

            var canvas = d3.select("body").select("p")
                        .insert("svg")
                        .attr("width", width + margin.left+10 + margin.right)
                        .attr("height", height + margin.top+10 + margin.bottom)
                        .style("background", "EEEEEE")
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .call(yAxis);

                canvas.append("g")
                        .attr("transform", "translate(8," + height + ")")
                        .call(xAxis);

            var circle = canvas.selectAll("circle")
                        .data(dataSet)
                        .enter()
                        .append("circle")
                        .attr("r", 1)
                        .attr("cx", function(ds, i){console.log(i);return(x(i));})
                        .attr("cy", function(ds){return(y(ds.finalGrade));})
                        .attr("fill", function(ds){return(d3.interpolateMagma(Math.random()));})
                        .attr("fill-opacity", function(ds, i){return(ds.finalGrade * 0.01)})
                        .transition()
                        .duration(1000)
                        .attr("transform", "translate(10,0)")
                        .transition()
                        .duration(1000)
                        .attr("r", 8);

            var text = canvas.selectAll("div")
                        .data(dataSet)
                        .enter()
                        .append("text")
                        .attr("fill", "blue")
                        .attr("y", function(ds){return(y(ds.finalGrade)-10);})
                        .attr("x", function(ds, i){return(x(i)+20);})
                        .on('mouseover', function(){})
                        .on('mouseout', this.hide)
                        .text(function(ds){console.log(ds.firstName);return ds.firstName}); console.log(text);         
        });
        //not in use. for top menu
        $( document ).tooltip({
            tooltipClass: "custom-tooltip-styling"
        });
})