//person object
var Person = function(x, y, v, r){
  this.x = x;
  this.y = y;
  this.v = v;
  this.r = 6;
  this.fill = '#f00';
}
Person.prototype.isBehind = function(anotherPerson){
  return (anotherPerson.x > this.x) && (Math.abs(this.y - anotherPerson.y) < (this.r + anotherPerson.r));
}

var width = 1000;
var height = 200;
var numberOfPersons = 20;
var persons = generatePersons();
var time = Date.now();

window.onload = function(){
  var circles = d3.select('svg').selectAll('circle').data(persons)
      .enter()
        .append('circle')
        .attr('class', 'person')
        .attr('cx', function(d){ return d.x; })
        .attr('cy', function(d){ return d.y; })
        .attr('r', function(d){ return d.r; });
    circles.on('click', circleClicked);
  //setupTimer();
}

function circleClicked(d, i){
  
  d3.selectAll('line').remove();
  d3.selectAll('rect').remove();
  
  var svg = d3.select('svg');
  svg.append('rect')
      .attr('x', d.x)
      .attr('y', d.y - d.r)
      .attr('width', width - d.x)
      .attr('height', 2 * d.r)
      .attr('fill', '#00f')
      .attr('opacity', 0.2);
  
  persons.forEach(function(person){
    person.fill = '#f00';
    if(d.isBehind(person)){
      person.fill = '#00f';
    }
  });
  redraw();
}

function setupTimer(){
  d3.timer(function(){
    var dt = Date.now() - time;
    persons.forEach(function(person){
      person.x += person.v * dt;
    });
    
    redraw();
    if (allPersonsAreOutOfTunnel()) {
      return true;
    }
  });
}

function redraw(){
  d3.selectAll('circle').data(persons)
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; })
    .attr('r', function(d){ return d.r; })
    .style('fill', function(d){return d.fill; });
}

function allPersonsAreOutOfTunnel(){
  var xPositions = persons.map(function(person){
    return person.x;
  });
  return d3.min(xPositions) > width;
}

function generatePersons(){
  var persons = [];
  for(var i = 0; i < numberOfPersons; i++){
    persons.push(new Person(Math.random() * 400, Math.random() * 186, (Math.random() + 0.1) / 1000));
  }
  return persons;
}