import * as d3 from 'd3';

export const makeLineChart = (height, width, margins, dataOptions, id, xTicks=4, sort=false ) =>  {
        if(dataOptions.data.length < 4) return;
        // //Format time values to just dates for this graph
        // const date = rawData[0].dateTime.split(' ')[0];
        // let data = rawData.filter(dp => dp.dateTime.split(' ')[0] === date)
        // data = data.map(value => ({
        //   value: value.price,
        //   date: value.dateTime
        // }));
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
            .ticks(xTicks)
            .tickSizeOuter(0),
          yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
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
          .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
          .call(xAxis);

        //Append and move y axis past margin
        vis
          .append('svg:g')
          .attr('transform', 'translate(' + margins.left + ',0)')
          .call(yAxis);

        //X axis label
        vis
          .append('text')
          .attr('class', 'axis-label')
          .attr(
            'transform',
            'translate(' + width / 2 + ' ,' + (height) + ')'
          )
          .style('text-anchor', 'middle')
          .text('Date');

        //Y-axis label
        vis
          .append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0)
          .attr('x', 0 - height / 2)
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text('Value (USD)');

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
        if(sort){
          const earliest = dataOptions.data.reduce((a,b) => (new Date(a.date) - new Date(b.date)) < 0 ? a : b);
          const latest = dataOptions.data.reduce((a,b) => new Date(b.date) - new Date(a.date) < 0 ? a : b);

          strokeColour = latest.value - earliest.value < 0 ?
            "#ff073a" :
            "#75ff83";
        } else {
          strokeColour = dataOptions.data[dataOptions.data.length - 1].value - dataOptions.data[0].value > 0 ? 
            "#ff073a" :
            "#75ff83";
        }

        vis
          .append('svg:path')
          .attr('d', lineGen(dataOptions.data))
          .attr('stroke', strokeColour)
          .attr('stroke-width', 4)
          .attr('fill', 'none');
        
        //Styling. scss not being applied
        d3.selectAll('text').style("font-size", "1.2em")
        d3.selectAll('.tick line').style("opacity", "0.45")

        const aspect = width/ height; 
        const parent = d3.select('#chart-container')
        d3.select(window)
          .on("resize", function() {
            const targetWidth = Math.round(parent.style("width").slice(0, -2));
            vis.attr("width", targetWidth);
            vis.attr("height", targetWidth / aspect);
            vis.html("");
            makeLineChart(targetWidth/ aspect, targetWidth, margins, dataOptions, id, xTicks)
        });
      }
