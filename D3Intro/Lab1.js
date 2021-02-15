/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* Example One: using d3 to style elements in the DOM */

d3.select('div#example1')
  .style('color', 'green');

// TODO 1: Rainbow Colors

// Use the D3 to change the background color of the firstDiv to vividred(#FF0018)
d3.select('div#firstDiv')
  .style('color', '#FF0018');

// Use the D3 to change the background color of the secondDiv to Deep Saffron(#FFA52C)
d3.select('#secondDiv')
  .style('color', '#FFA52C');

//   Use the D3 to change the background color of the thirdDiv to Maximum Yellow(#FFFF41)
d3.select('#thirdDiv')
  .style('color', '#FFFF41');

//   Use the D3 to change the background color of the fourthDiv to Green (#008018)
d3.select('#fourthDiv')
  .style('color', '#008018');
//   Use the D3 to change the background color of the fifthDiv to Blue (#0000F9)
d3.select('#fifthDiv')
  .style('color', '#0000F9');
//   Use the D3 to change the background color of the lastDiv to Philippine Violet(#86007D)
d3.select('#lastDiv')
  .style('color', '#86007D');

/*
  Example Two:
  Use d3 to load JSON data: Load the data from file sales.json
  Display the conference name in an element for each item.
*/

d3.json('../data/sales.json')
  .then((data) => {
    d3.select('#sales-data')
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      // set the text for each div
      .text((f) => `${f.conference_name}`)
      // add a style for each div
      .style('font-weight', 'bold')
      .style('color', 'blue');
  });

/*
  TODO 2:
  Load the monthly sales data. Display the month and the sales amount.
  Stretch: Make each month a different color.
*/

d3.json('../data/monthlySales.json')
  .then((data) => {
    // Scale/map data to color scheme
    const colors = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemePaired);

    d3.select('#monthly-sales-data')
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .text((m) => `${m.month}: $${m.sales}`)
      .style('color', (m) => colors(m.month));
  });

/*
  Challenge:
  Display the distance data. Show the date as text and the distance as
  the width of each element.
  Stretch: Format the date as "Day Month date, Year"
*/

d3.json('../data/distanceCovered.json')
  .then((data) => {
    const maxDistance = data
      .map((r) => r.kilometeres)
      .reduce((max, km) => Math.max(max, km), 0);

    const w = maxDistance;
    const h = data.length;
    const padding = 2;

    const svg = d3.select('#distance-data')
      .append('svg')
      .attr('width', w)
      .attr('height', (h + padding) * 20);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => i * (20 + padding))
      .attr('width', (d) => d.kilometeres)
      .attr('height', 20)
      .attr('fill', '#c65');

    // rect can't display text on its own..
    // proper way: create & append new text element to svg
    const label = svg.selectAll('.labels')
      .data(data)
      .enter()
      .append('text');

    label
      .text((d) => d.date)
      .attr('x', 5)
      .attr('y', (_, i) => (i * 22) + 14)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', 'white');
  });
