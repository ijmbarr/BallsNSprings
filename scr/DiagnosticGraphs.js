BallsNSprings.EnergyGraph = function(bNs, svgElement){
    this.bNs = bNs;
    this.svgElement = svgElement;
    this.width = parseInt(svgElement.getAttribute("width"));
    this.height = parseInt(svgElement.getAttribute("height"));
    
    bNs.thingsToTick.push(this);
	
    var n = 200;
    var now = 200;
      
    var groups = {
        ke : 
            {
                data : d3.range(n).map(function() { return 0; }),
                color : "red"
            },
        pe : 
            {
                data : d3.range(n).map(function() { return 0; }),
                color : "blue"
            },
        total : 
            {
                data : d3.range(n).map(function() { return 0; }),
                color : "green"
            }
    }

    var margin = {top: 10, right: 50, bottom: 30, left: 100},
        width = this.width - margin.right - margin.left,
        height = this.height - margin.top - margin.bottom;
	
    var x = d3.time.scale()
        .domain([0, n])
        .range([margin.left, width]);
	
    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0,10]);
    

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d, i) { return x(i + now - (n - 1)); })
        .y(function(d, i) { return y(d); });
  
    var svg = d3.select(this.svgElement)
        .append("g");
        //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var Xaxis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x.axis = d3.svg.axis().scale(x).orient("bottom").ticks(5)),
        Yaxis = svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + ",0 )")
        .call(y.axis = d3.svg.axis().scale(y).orient("left").ticks(5));
        

    var paths = svg.append("g");
  
    for( var d in groups){
        var group = groups[d];
        group.path = paths.append("path")
            .datum(group.data)
            .attr("class", "line")
            .style("stroke", group.color)
            .attr("d", line);
    }
    
    this.tick = function(ellapsed){
        if(bNs.Running){
            //Update lines    
            for (var g in groups){
                var group = groups[g];
                group.data.push(bNs.energy[g]);
                group.path.attr("d", line);
            }
                
            //update axis
            now += 1;
            x.domain([now - (n - 2), now - 1]);
            Xaxis.call(x.axis);
            y.domain([0, d3.max(groups.total.data)]);
            Yaxis.call(y.axis);
                
            //Remove old data point
            for (var g in groups){
                var group = groups[g];
                group.data.shift();
            }
        }
    }
}


