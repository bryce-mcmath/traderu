import * as d3 from 'd3';
import { formatCurrency } from '@coingecko/cryptoformat';

//minimum data points to display graph
const MIN_DATA_POINTS = 4;
//Minimum value to truncate y-axis values
const LARGE_VALUES = 10000;

function formattedValue(val, large=false) {
  //remove trailing zeros
  val = parseFloat(val.toString().replace(/(\.\d*?[1-9])0+$/g, '$1'));
  if(large){
    return Math.round(val / 1000);
  }
  switch (val) {
    case val > 0.1:
      val = val.toFixed(2);
      break;
    case val > 0.01:
      val = val.toFixed(3);
      break;
    case val > 0.001:
      val = val.toFixed(4);
      break;
  }
  return formatCurrency(val, 'USD', 'en').replace(/(\.\d*?[1-9])0+$/g, '$1');
}

function setXAxisTicks(xTickInterval, data) {
  let tickFormat, xAxisTickInterval;
  if (xTickInterval === '1year') {
    xAxisTickInterval = d3.timeMonth.every(4);
    tickFormat = d3.timeFormat('%b');
  } else if (xTickInterval === '3month') {
    xAxisTickInterval = d3.timeMonth.every(1);
    tickFormat = d3.timeFormat('%b');
  } else if (xTickInterval === 'Day') {
    xAxisTickInterval = d3.timeHour.every(2);
    tickFormat = d3.timeFormat('%H:%M');
  } else {
    const dates = data.map(data => new Date(data.date).valueOf())
    const dayRange = Math.max(...dates) - Math.min(...dates);
    const days = dayRange / 86400000;
    const every = Math.round(days / 4);
    xAxisTickInterval = d3.timeDay.every(every);
    tickFormat = d3.timeFormat('%d %b');
  }
  return [tickFormat, xAxisTickInterval];
}

export const makeLineChart = (
  dimensions,
  chartId,
  data,
  dataOptions
) => {
  if (data.length < MIN_DATA_POINTS) return;

  const hasLargeValues = data.some(data => Number(data.value) > LARGE_VALUES)
  const [tickFormat, xAxisTickInterval] = setXAxisTicks(dataOptions.xTickInterval, data)
  const parseTime = d3.timeParse(dataOptions.timeParseString);

  const vis = d3.select(chartId)
  const xScale = d3
      .scaleTime()
      .range([dimensions.margins.left, dimensions.width - dimensions.margins.right])
      .domain(d3.extent(data, d => parseTime(d.date)))
  const yScale = d3
      .scaleLinear()
      .range([dimensions.height - dimensions.margins.top, dimensions.margins.bottom])
      .domain([
        d3.min(data, d => Number(d.value)) * 0.9,
        d3.max(data, d => Number(d.value)) * 1.1
      ])
  const xAxis = d3
      .axisBottom(xScale)
      .ticks(xAxisTickInterval)
      .tickFormat(tickFormat)
      .tickSizeOuter(0)
  const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => formattedValue(d, hasLargeValues))
      .tickSizeOuter(0);

  function makeXGridlines() {
    return d3.axisBottom(xScale);
  }

  // gridlines in y axis function
  function makeYGridlines() {
    return d3.axisLeft(yScale);
  }

  //Append and move down x axis
  vis
    .append('svg:g')
    .attr('transform', 'translate(0,' + (dimensions.height - dimensions.margins.top) + ')')
    .call(xAxis);

  //Append and move y axis past margin
  vis
    .append('svg:g')
    .attr('transform', 'translate(' + dimensions.margins.left + ',0)')
    .call(yAxis);

  //Y-axis label for values over 10000
  if(hasLargeValues){
    vis
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - dimensions.height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value (Thousands USD)');
  }

  //Add x gridlines
  vis
    .append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + (dimensions.height - dimensions.margins.bottom) + ')')
    .call(
      makeXGridlines()
        .tickSize(-(dimensions.height - dimensions.margins.bottom - dimensions.margins.top))
        .tickFormat('')
        .tickSizeOuter(0)
    );

  // add the Y gridlines
  vis
    .append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(' + dimensions.margins.left + ', 0)')
    .call(
      makeYGridlines()
        .tickSize(-(dimensions.width - dimensions.margins.left - dimensions.margins.right))
        .tickFormat('')
        .tickSizeOuter(0)
    );
  //Make line
  const lineGen = d3
    .line()
    .x(d => xScale(parseTime(d.date)))
    .y(d => {
      return yScale(d.value);
    });

  let strokeColour;
  if (dataOptions.sort) {
    const earliest = data.reduce((a, b) =>
      new Date(a.date) - new Date(b.date) < 0 ? a : b
    );
    const latest = data.reduce((a, b) =>
      new Date(b.date) - new Date(a.date) < 0 ? a : b
    );

    strokeColour = latest.value - earliest.value < 0 ? '#ff073a' : '#75ff83';
  } else {
    strokeColour =
      data[data.length - 1].value -
        data[0].value >
      0
        ? '#ff073a'
        : '#75ff83';
  }

  vis
    .append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', strokeColour)
    .attr('stroke-dimensions.width', 4)
    .attr('fill', 'none');

  d3.selectAll('.tick line').style('opacity', '0.45');
};




//NOTE: needs a rewrite to match refactor of makelinechart
// function setResponsiveness(){
//     // @TODO: The below was the source of the "cannot read property style of null" error
//   // Adding the if statement stopped the error from being thrown, but their are still
//   // graph resizing issues. Easiest to notice when you open a d3 line chart, and then
//   // click the nav drawer. Triggers resize and messes dimensions up
//   const aspect = dimensions.width / dimensions.height;
//   d3.select(window).on('resize', function() {
//     const parent = d3.select('#chart-container');
//     if (parent && parent._groups[0][0] !== null) {
//       const targetWidth = Math.round(parent.style('width').slice(0, -2));
//       vis.attr('width', targetWidth);
//       vis.attr('height', targetWidth / aspect);
//       vis.html('');
//       makeLineChart(
//         targetWidth / aspect,
//         targetWidth,
//         dimensions.margins,
//         dataOptions,
//         chartId,
//         dataOptions.xTickInterval
//       );
//     }
//   });
// }