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

            var div = d3.select("body").append("div")   
                        .attr("class", "tooltip")               
                        .style("opacity", 0);
                
            var circle = canvas.selectAll("circle")
                        .data(dataSet)
                        .enter()
                        .append("circle")
                        .attr("r", 1)
                        .attr("cx", function(ds, i){return(x(i));})
                        .attr("cy", function(ds){return(y(ds.finalGrade));})
                        .on("mouseover", function(d) {      
                            div.transition()        
                                .duration(200)      
                                .style("opacity", .9);      
                            div .html("<h6><b>"+d.firstName +" "+ d.lastName  + "</b></h6>" + "finalGrade: " + d.finalGrade)  
                                .style("left", (d3.event.pageX) + "px")     
                                .style("top", (d3.event.pageY - 28) + "px");    
                            })                  
                        .on("mouseout", function(d) {       
                            div.transition()        
                                .duration(500)      
                                .style("opacity", 0);   
                        })
                        .attr("fill", function(ds){return(d3.interpolateMagma(Math.random()));})
                        .attr("fill-opacity", function(ds, i){return(ds.finalGrade * 0.01)})
                        .transition()
                        .duration(1000)
                        .attr("transform", "translate(10,0)")
                        .transition()
                        .duration(1000)
                        .attr("r", 8);
            //Add lines to dots
            // var line = canvas.selectAll("div")
            //             .data(dataSet)
            //             .enter()
            //             .append("div")
            //             .class("stroke")
            //             .attr("x1", function(ds, i){return(x(i)+20);})
            //             .attr("y1", function(ds){return(y(ds.finalGrade)-10);})
            //             .attr("x2", function(ds, i){return(x(i)+20);})
            //             .attr("y2", 0);
        });
        //not in use. for top menu
        // $( document ).tooltip({
        //     tooltipClass: "custom-tooltip-styling"
        // });
})