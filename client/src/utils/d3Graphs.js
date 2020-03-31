import * as d3 from 'd3';
import { formatCurrency } from '@coingecko/cryptoformat';

function formattedValue(val) {
  val = parseFloat(val.toString().replace(/(\.\d*?[1-9])0+$/g, '$1'));
  switch (val) {
    case val > 0.1:
      val = val.toFixed(2);
      break;
    case val > 0.01:
      val = val.toFixed(3);
      break;
    case val > 0.0001:
      val = val.toFixed(4);
      break;
  }
  return formatCurrency(val, 'USD', 'en').replace(/(\.\d*?[1-9])0+$/g, '$1');
}

export const makeLineChart = (
  height,
  width,
  margins,
  dataOptions,
  id,
  xTickInterval,
  sort = false
) => {
  if (dataOptions.data.length < 4) return;

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
    const days = dataOptions.data.length;
    const every = Math.round(days / 4);
    xAxisTickInterval = d3.timeDay.every(every);
    tickFormat = d3.timeFormat('%d %b');
  }
  const parseTime = d3.timeParse(dataOptions.timeParseString);
  const vis = d3.select(id),
    xScale = d3
      .scaleTime()
      .range([margins.left, width - margins.right])
      .domain(d3.extent(dataOptions.data, d => parseTime(d.date))),
    yScale = d3
      .scaleLinear()
      .range([height - margins.top, margins.bottom])
      //Going from min to max, 0 to max might be better
      .domain([
        d3.min(dataOptions.data, d => Number(d.value)) * 0.9,
        d3.max(dataOptions.data, d => Number(d.value)) * 1.1
      ]),
    xAxis = d3
      .axisBottom(xScale)
      //Ticks is a hint, not exact. Frustrating, but better to go under than over
      // .ticks(d3.timeHour.every(3))
      .ticks(xAxisTickInterval)
      .tickFormat(tickFormat)
      .tickSizeOuter(0),
    yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(formattedValue)
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
    .attr('transform', 'translate(0,' + (height - margins.top) + ')')
    .call(xAxis);

  //Append and move y axis past margin
  vis
    .append('svg:g')
    .attr('transform', 'translate(' + margins.left + ',0)')
    .call(yAxis);

  //X axis label
  // vis
  //   .append('text')
  //   .attr('class', 'axis-label')
  //   .attr('transform', 'translate(' + width / 2 + ' ,' + height + ')')
  //   .style('text-anchor', 'middle')
  //   .text('Date');

  //Y-axis label
  // vis
  //   .append('text')
  //   .attr('class', 'axis-label')
  //   .attr('transform', 'rotate(-90)')
  //   .attr('y', 0)
  //   .attr('x', 0 - height / 2)
  //   .attr('dy', '1em')
  //   .style('text-anchor', 'middle')
  //   .text('Value (USD)');

  //Add x gridlines
  vis
    .append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
    .call(
      makeXGridlines()
        .tickSize(-(height - margins.bottom - margins.top))
        .tickFormat('')
        .tickSizeOuter(0)
    );

  // add the Y gridlines
  vis
    .append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(' + margins.left + ', 0)')
    .call(
      makeYGridlines()
        .tickSize(-(width - margins.left - margins.right))
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
  if (sort) {
    const earliest = dataOptions.data.reduce((a, b) =>
      new Date(a.date) - new Date(b.date) < 0 ? a : b
    );
    const latest = dataOptions.data.reduce((a, b) =>
      new Date(b.date) - new Date(a.date) < 0 ? a : b
    );

    strokeColour = latest.value - earliest.value < 0 ? '#ff073a' : '#75ff83';
  } else {
    strokeColour =
      dataOptions.data[dataOptions.data.length - 1].value -
        dataOptions.data[0].value >
      0
        ? '#ff073a'
        : '#75ff83';
  }

  vis
    .append('svg:path')
    .attr('d', lineGen(dataOptions.data))
    .attr('stroke', strokeColour)
    .attr('stroke-width', 4)
    .attr('fill', 'none');

  //Styling. scss not being applied
  // d3.selectAll('text').style("font-size", "1.2em")
  d3.selectAll('.tick line').style('opacity', '0.45');

  // @TODO: The below was the source of the "cannot read property style of null" error
  // Adding the if statement stopped the error from being thrown, but their are still
  // graph resizing issues. Easiest to notice when you open a d3 line chart, and then
  // click the nav drawer. Triggers resize and messes dimensions up
  // const aspect = width / height;
  // d3.select(window).on('resize', function() {
  //   const parent = d3.select('#chart-container');
  //   if (parent && parent._groups[0][0] !== null) {
  //     const targetWidth = Math.round(parent.style('width').slice(0, -2));
  //     vis.attr('width', targetWidth);
  //     vis.attr('height', targetWidth / aspect);
  //     vis.html('');
  //     makeLineChart(
  //       targetWidth / aspect,
  //       targetWidth,
  //       margins,
  //       dataOptions,
  //       id,
  //       xTickInterval
  //     );
  //   }
  // });
};