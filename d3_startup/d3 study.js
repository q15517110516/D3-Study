//NOTE
        // Simple Histogram
        var dataset = []; // Initialize empty array
        for (var i = 0; i < 25; i++) { // Loop 25 times
            var newNumber = Math.round(Math.random() * 30); // New random number (0-30)
            dataset.push(newNumber); // Add new number to array
        }
        d3.select("body") // Call D3 "select" method, which uses CSS selector to select an element from the DOM ("body")
            .selectAll("div") // Select all paragraphs in the DOM. Because there are no paragraphs at all, it returns an empty selection. Correspond this empty selection to many paragraphs that "will appear"
            .data(dataset) // Count and parse data values. Our data set have 5 values, so the code passed here will be executed 5 times, corresponding to 5 values
            .enter() // To generate new data-bound elements, you must use the 'enter()' method. This method compares the number of DOM elements with the data to be processed. If there are more data values than the corresponding DOM element, the 'enter()' method generates new placeholder elements and performs the remaining operations on each placeholder element. Each placeholder element is passed to the next method in the chain.
            .append("div") // Create a new "p" element and add it to the end of our selected element, exactly inserted at the end of the "body" tag, just before the </body>
            .attr("class", "bar") // 'attr()' is used to set the HTML attribute and its value on the element
            .style("height", function(d) { // The 'style()' method is used to apply CSS attributes and values directly to HTML elements. This method is equivalent to writing the CSS rules in the style directly into the HTML element 
                var barHeight = d * 5; // Scale up by factor of 5
                return barHeight + "px";
            });
        // .style("color", function(d) {
        //     if (d > 15) {
        //         return "red";
        //     } else {
        //         return "black";
        //     }
        // })
        // .text(function(d) {
        //     return d;
        // });

        //NOTE
        // Examples of how to draw circles using SVG along with ".attr()"
        var w = 500;
        var h = 300;
        var dataset1 = [5, 10, 15, 20, 25];

        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var circles = svg.selectAll("circle")
            .data(dataset1)
            .enter()
            .append("circle");

        circles.attr("cx", function(d, i) {
                return (i * 50) + 25;
            })
            .attr("cy", h / 2)
            .attr("r", function(d) {
                return d;
            })
            .attr("fill", "yellow")
            .attr("stroke", "orange")
            .attr("stroke-width", function(d) {
                return d / 2;
            });

        //NOTE
        // Draw a hisogram
        var dataset2 = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
        var barPadding = 1;

        var svgHistogram = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svgHistogram.selectAll("rect")
            .data(dataset2)
            .enter()
            .append('rect')
            .attr("x", function(d, i) {
                return i * (w / dataset2.length);
            })
            .attr("y", function(d) {
                return h - (d * 4);
            })
            .attr("width", w / dataset2.length - barPadding)
            .attr("height", function(d) {
                return d * 4;
            })
            .attr("fill", function(d) {
                return "rgba(0, 0," + (d * 10) + ")";
            });

        svgHistogram.selectAll("text")
            .data(dataset2)
            .enter()
            .append("text")
            .text(function(d) {
                return d;
            })
            .attr("x", function(d, i) {
                return i * (w / dataset2.length) + 5;
            })
            .attr("y", function(d) {
                return h - (d * 4) + 15;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");
        // .attr("text-anchor", "middle");

        //NOTE
        // Draw scatter plot
        var dataset3 = [
            [5, 20],
            [480, 90],
            [250, 50],
            [100, 33],
            [330, 95],
            [410, 12],
            [475, 44],
            [25, 67],
            [85, 21],
            [220, 88],
            [600, 150]
        ];

        var svgScatterplot = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svgScatterplot.selectAll("circle")
            .data(dataset3)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return d[0];
            })
            .attr("cy", function(d) {
                return d[1];
            })
            .attr("r", 5);

        svgScatterplot.selectAll("text")
            .data(dataset3)
            .enter()
            .append("text")
            .text(function(d) {
                return d[0] + "," + d[1];
            })
            .attr("x", function(d) {
                return d[0];
            })
            .attr("y", function(d) {
                return d[1];
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "red");


        //NOTE
        // D3 Scale
        // var scale = d3.scale.linear()
        //     .domain([100, 500])
        //     .range([10, 350]);


        // Example of scaling scatter plot with axis
        var dataset4 = [];
        var numberDataPoints = 50;
        var xRange = Math.random() * 1000;
        var yRange = Math.random() * 1000;
        for(var i = 0; i < numberDataPoints; i++){
            var newNumber1 = Math.round(Math.random() * xRange);
            var newNumber2 = Math.round(Math.random() * yRange);
            dataset4.push([newNumber1, newNumber2]);
        }
        var padding = 30;
        var xScale = d3.scale.linear()
            .domain([0, d3.max(dataset4, function(d) {
                return d[0];
            })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset4, function(d) {
                return d[1];
            })])
            .range([h - padding, padding]);

        var rScale = d3.scale.linear()
            .domain([0, d3.max(dataset4, function(d) {
                return d[1];
            })])
            .range([2, 5]);

        // Building Axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);

        var svgScatterplot1 = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svgScatterplot1.selectAll("circle")
            .data(dataset4)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", function(d) {
                return rScale(d[1]);
            });

            // svgScatterplot1.selectAll("text")
            //     .data(dataset4)
            //     .enter()
            //     .append("text")
            //     .text(function(d) {
            //         return d[0] + "," + d[1];
            //     })
            //     .attr("x", function(d) {
            //         return xScale(d[0]);
            //     })
            //     .attr("y", function(d) {
            //         return yScale(d[1]);
            //     })
            //     .attr("font-family", "sans-serif")
            //     .attr("font-size", "11px")
            //     .attr("fill", "red");

        // Building Axis
        svgScatterplot1.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("class", "axis")
            .call(xAxis);
        svgScatterplot1.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .attr("class", "axis")
            .call(yAxis);
            



            