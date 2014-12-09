
$(function(){
var pathOuter;
function addAxesAndLegend (svg, xAxis, margin, chartWidth, chartHeight) {

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis)
}

function drawPaths (svg, data, x, y) {

  var upperOuterArea = d3.svg.area()
    .interpolate('cardinal-open')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.pct95); })
    .y1(function (d) { return y(d.pct75); });
  
  var medianLine = d3.svg.line()
    .interpolate('cardinal-open')
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.pct50); }); 

  //  .y(function (d) { return y(d.pct95); })

  svg.datum(data);
  // svg.append('path')
  //   .attr('class', 'area upper outer')
  //   .attr('d', upperOuterArea)
  //   .attr('clip-path', 'url(#rect-clip)');
  
    

    //console.log(pathEl.getPointAtLength(100));

  pathOuter = svg.append('path')
    .attr('class', 'median-line')
    .attr('d', medianLine)
    .style("stroke-dasharray", ("16, 16"))
    .attr('clip-path', 'url(#rect-clip)');
  pathOuter = pathOuter.node();


}

function addMarker (marker, svg, chartHeight, x) {
  
  var radius = 4,
      xPos = x(marker.date),
      yPosStart = chartHeight;
      
 
  // console.log(pathOuter.getTotalLength());
  var markerG = svg.append('g')
    .attr('class', 'marker c')
    .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
    .attr('opacity', 0);

  // console.log(xPos);

  yPosEnd = pathOuter.getPointAtLength((pathOuter.getTotalLength()/1180)*xPos);  
  markerG.transition()
    .duration(1000)
    .attr('transform', 'translate(' + (xPos-40) + ', ' + (yPosEnd.y-75) + ')')
    .attr('opacity', 1);
 
  markerG.append('image')
     .attr('class','marker-img')
     .attr('height','80')
     .attr('width','80')
     .attr('xlink:href','../board.png');

  // markerG.append('path')
  //   .attr('d', 'M' + radius + ',' + (chartHeight-yPosStart) + 'L' + radius + ',' + (chartHeight-yPosStart))
  //   .transition()
  //     .duration(1000)
  //     .attr('d', 'M' + radius + ',' + (chartHeight-yPosEnd) + 'L' + radius + ',' + (radius*2));

  // markerG.append('circle')
  //   .attr('class', 'marker-bg')
  //   .attr('cx', radius)
  //   .attr('cy', radius)
  //   .attr('r', radius);
  

  var marker_date = marker.date + "";
  marker_date = marker_date.split(" ");
  marker_date = marker_date[1] + " " + marker_date[2];
  markerG.append('text')
    .attr('x', "18")
    .attr('y', "25")
    .text(marker_date);
}
$("body").on("click", ".marker.c text", function(e){
  e.preventDefault();
  $(this).siblings(".marker-img").trigger("click");
});

function startTransitions (svg, chartWidth, chartHeight, rectClip, markers, x) {
  rectClip.transition()
    .duration(1000*markers.length)
    .attr('width', chartWidth);
  
  $.each(markers, function( i, marker ) {
    addMarker(marker, svg, chartHeight, x);
    // setTimeout(function () {
    // }, 1000 + 500*i);
    if(i == markers.length-1)
      popover();
  });

  function popover(){
      $("body").find(".marker.c .marker-img").each(function (i) {
          var temp = markers[i]; 
          cnt =  '<p class = "popover-date">'+temp.ndt+'</p><p>'+temp.desc+'</p><img src='+temp.img+'>';
          $(this).popover({
              title: temp.title,
              content: cnt,
              trigger: "hover",
              html: true, 
              container: $("#container")
          });
      });
  }
  $("#newtm-add").click(function(e){
    e.preventDefault();
    var dt = $('.tmln-date').val();
    
    dt = dt.replace(/\//g, '-');
    var fdt = dt.split("-");
    fdt = fdt[2] + "-" + fdt[0] + "-" + fdt[1];  
    var new_marker = {
          "date": parseDate(fdt),
          "ndt" : fdt,
          "title": $('.tmln-title').val(),
          "desc":$('.tmln-desc').val(),
          "img": $('.img-prvw').find("img").attr("src")
        };  
    var new_marker2 = {
          "date": fdt,
          "ndt" : fdt,
          "title": $('.tmln-title').val(),
          "desc":$('.tmln-desc').val(),
          "img": $('.img-prvw').find("img").attr("src")
        };     

    markers.push(new_marker2);
    addMarker(new_marker, svg, chartHeight, x);
    popover();
    
    $.each(markers, function(i, m) {
      m.date = m.ndt;
    })
   
    var jsn_dt = {
      "fun" : "ejson",
      "cnt" : JSON.stringify(markers) 
    };
    $.ajax({
            url: '/tmlnbckend.php',
            method: 'POST',
            data: jsn_dt,
            success: function (res) {
                console.log(res);
            }
    });

  });

}

function makeChart (data, markers) {
  var svgWidth  = $(window).width() - 16,
      svgHeight = $(window).height(),
      margin = { top: 20, right: 0, bottom: 40, left: 0 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom;
  var xrange= [];
  var x = d3.time.scale().range([0, chartWidth])
            .domain(d3.extent(data, function (d) { return d.date; }));

  var y = d3.scale.linear().range([chartHeight, 0])
            .domain([0, 24]); //24 hrs time
  


  // var markers = [
  //     {
  //         "date": parseDate("2014-06-20"),
  //         "ndt":"2014-06-20",
  //         "title": "Idea .........",
  //         "desc":"jjksdf dfs b sdfb  df b",
  //         "img":"../uploads/townhall5.png"
  //       },

  //       {
  //         "date": parseDate("2014-08-20"),
  //          "ndt": "2014-08-20",
  //         "title": "Idea2 .........",
  //         "desc":"KFV FS SDFB S FB  FDB",
  //         "img":"../uploads/townhall5.png"
  //       },
  //       {
  //         "date": parseDate("2014-10-20"),
  //         "ndt": "2014-10-20",
  //         "title": "Idea3.........",
  //         "desc":"ahsdvbajsjvsdv",
  //         "img":"../uploads/townhall5.png"
  //       }] ;


  var xAxis = d3.svg.axis().scale(x).orient('bottom')
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

  addAxesAndLegend(svg, xAxis, margin, chartWidth, chartHeight);
  drawPaths(svg, data, x, y);

  startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
}



var parseDate  = d3.time.format('%Y-%m-%d').parse;
d3.json('../json/thubxaxis.json', function (error, rawData) {
  if (error) {
    console.error(error);
    return;
  }

  data = rawData.map(function (d) {
    return {
      date:  parseDate(d.date),
      pct75: d.pct75,
      pct95: d.pct95,
      pct50: d.pct50
    };
  });

  d3.json('../json/testing.json', function (error, makerData) {
  if (error) {
    makeChart(data, []);
    // console.error(error);
    // return;
  }
  else{
  markers = makerData;
  $.each(markers, function(i, m) {
    m.date = parseDate(m.ndt);
  })
  makeChart(data, markers);
  }
  });
});


   $('.select-img').on('change', function(){
         var formData = new FormData();
         var files = document.getElementById('add-img');
         files = files.files;
         formData.append('add-img', files[0],files[0].name);
         formData.append("fun","uimg");
         $.ajax({
            url: '/tmlnbckend.php',
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (res) {
                $('.img-prvw').show();
                $('.img-prvw').html("<a class='chng-img'><p>Change Image</p></a><img src='"+res+"'>");
            }
        });
  });
  $('.form-img').on('click', '.chng-img', function(){
    $('.img-prvw').empty();
  });
    $( ".datetimepicker" ).datepicker({
      showOn: "button",
      buttonImage: "cal.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });



});