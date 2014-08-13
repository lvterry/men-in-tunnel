var r = 7;
var width = 1000;
var height = 200;
var numberOfCircles = 30;
var circles = generateCircles();
var time = Date.now();

window.onload = function(){
  //append Circles
  d3.select('svg').selectAll('circle')
    .data(circles)
    .enter().append('circle')
    .attr('class', 'circle')
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; })
    .attr('r', r);
  setupTimer();
}

function setupTimer(){
  d3.timer(function(){
    var dt = Date.now() - time;
    circles.forEach(function(c){
      c.x += c.v * dt;
    });
    redraw();
    if (allCirclesAreOutOfTunnel()) {
      return true;
    }
  });
}

function redraw(){
  d3.selectAll('circle').data(circles).attr('cx', function(d){ return d.x; });
}

function allCirclesAreOutOfTunnel(){
  var xPositions = circles.map(function(circle){
    return circle.x;
  });
  return (d3.min(xPositions) > width + r);
}

function generateCircles(){
  var circles = [];
  for(var i = 0; i < numberOfCircles; i++){
    circles.push(generateCircle());
  }
  return circles;
}

function generateCircle(){
  return {
    x: Math.random() * 100,
    y: Math.random() * 186,
    v: (Math.random() + 0.1) / 1000
  };
}