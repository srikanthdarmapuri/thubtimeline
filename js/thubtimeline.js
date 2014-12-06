
$(function(){

function addAxesAndLegend (svg, xAxis, yAxis, margin, chartWidth, chartHeight) {

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis)
    
  axes.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Time (hrs)');  
}

function drawPaths (svg, data, x, y) {
  var upperOuterArea = d3.svg.area()
    .interpolate('cardinal-open')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.pct95); })
    .y1(function (d) { return y(d.pct75); });

  //  .y(function (d) { return y(d.pct95); })

  svg.datum(data);

  svg.append('path')
    .attr('class', 'area upper outer')
    .attr('d', upperOuterArea)
    .attr('clip-path', 'url(#rect-clip)');
}

function addMarker (marker, svg, chartHeight, x) {
  var radius = 4,
      xPos = x(marker.date) - radius - 3,
      yPosStart = chartHeight - radius - 3,
      yPosEnd = (300-((300*marker.time)/24));

  var markerG = svg.append('g')
    .attr('class', 'marker c'+(Math.floor(marker.time.split(":")[0]/2)))
    .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
    .attr('opacity', 0);

  markerG.transition()
    .duration(1000)
    .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
    .attr('opacity', 1);

  // markerG.append('path')
  //   .attr('d', 'M' + radius + ',' + (chartHeight-yPosStart) + 'L' + radius + ',' + (chartHeight-yPosStart))
  //   .transition()
  //     .duration(1000)
  //     .attr('d', 'M' + radius + ',' + (chartHeight-yPosEnd) + 'L' + radius + ',' + (radius*2));

  markerG.append('circle')
    .attr('class', 'marker-bg')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius);

  // markerG.append('text')
  //   .attr('x', radius)
  //   .attr('y', radius*0.9)
  //   .text(marker.title);
}

function startTransitions (svg, chartWidth, chartHeight, rectClip, markers, x) {
  rectClip.transition()
    .duration(1000*markers.length)
    .attr('width', chartWidth);

  markers.forEach(function (marker, i) {
    setTimeout(function () {
      addMarker(marker, svg, chartHeight, x);
    }, 1000 + 500*i);
  });

  $("#newtm-add").click(function(){
     var dnt = $("#newtm-time").val().split(" ");
     dnt[0] = dnt[0].replace(/\//g, '-');
     var newMarker = {
          "date": parseDate(dnt[0]),
          "title": $("#newtm-ttl").val(),
          "ftime": dnt[1],
          "time": dnt[1].split(":")[0]
     }
      addMarker(newMarker, svg, chartHeight, x);
  });

}

function makeChart (data, markers) {
  var svgWidth  = 1200,
      svgHeight = 400,
      margin = { top: 20, right: 20, bottom: 40, left: 40 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom;
  var xrange= [];
  var x = d3.time.scale().range([0, chartWidth])
            .domain(d3.extent(data, function (d) { return d.date; }));

  var y = d3.scale.linear().range([chartHeight, 0])
            .domain([0, 24]); //24 hrs time

  var xAxis = d3.svg.axis().scale(x).orient('bottom')
                .innerTickSize(-8).outerTickSize(0).tickPadding(10),
      yAxis = d3.svg.axis().scale(y).orient('left')
                .innerTickSize(-8).outerTickSize(0).tickPadding(10);

  var svg = d3.select('body').append('svg')
    .attr('width',  svgWidth)
    .attr('height', svgHeight)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // clipping to start chart hidden and slide it in later
  var rectClip = svg.append('clipPath')
    .attr('id', 'rect-clip')
    .append('rect')
      .attr('width', 0)
      .attr('height', chartHeight);

  addAxesAndLegend(svg, xAxis,yAxis, margin, chartWidth, chartHeight);
  drawPaths(svg, data, x, y);
  startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
}

var parseDate  = d3.time.format('%Y-%m-%d').parse;
d3.json('../json/thubtimeline1.json', function (error, rawData) {
  if (error) {
    console.error(error);
    return;
  }

  var data = rawData.map(function (d) {
    return {
      date:  parseDate(d.date),
      pct75: d.pct75 / 1000,
      pct95: d.pct95 / 1000
    };
  });


  //ajax call response ...
  var markers = [
        {
          "date": parseDate("2014-06-02"),
          "title": "THUB announcement",
          "time":"16"
        },
        {
          "date": parseDate("2014-08-20"),
          "title": "Idea .........",
          "time":"8"
        },
        {
          "date": parseDate("2014-08-27"),
          "title": "Working .....",
          "time":"20"
        },
        {
          "date": parseDate("2014-09-03"),
          "title": "working ....2",
          "time":"24"
        }
    ];
    makeChart(data, markers);


});


});