fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then((response) => response.json())
    .then((data) => {

        // Layout
        const dataSet = data.monthlyVariance;
        const w = 1300;
        const h = 580;
        const p = { left: 70, bottom: 140 };

        // Scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(dataSet, d => d['year']))
            .range([p.left, w]);
        const yScale = d3.scaleBand()
            .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
            .range([h - p.bottom, 0]);
        const colorScale = d3.scaleLinear()
            .domain(d3.extent(dataSet, d => d['variance']))
            .range([0, 1]);

        // Axis and tick formatting
        const month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        const monthR = [...month].reverse();
        const xAxis = d3.axisBottom(xScale).ticks(30).tickFormat(d3.format('d'));
        const yAxis = d3.axisLeft(yScale).ticks(12).tickFormat((d, i) => monthR[i]);

        // Append SVG and tooltip
        const svg = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        const Tooltip = d3.select("#graph")
            .append("div")
            .style("display", 'none')
            .attr("id", "tooltip");

        // tooltip functions
        function mouseover() {
            Tooltip.style("display", 'block')
            d3.select(this)
                .style("fill", 'white');
        }
        function mousemove(event, d) {
            const negativeReg = /-/;
            Tooltip.html(`${month[d['month'] - 1]} ${d['year']}<br>
            ${((data['baseTemperature'] * 10 ** 3) + (d['variance'] * 10 ** 3)) / 10 ** 3} °C<br>
            ${negativeReg.test(d['variance']) ? d['variance'] : '+' + d['variance']}`)
                .style("left", event.pageX + 20 + "px")
                .style("top", event.pageY - 100 + "px")
                .style('border-color', d3.interpolateTurbo(colorScale(d['variance'])))
                .attr('data-year', d['year']);
        }
        function mouseleave(event, d) {
            Tooltip.style("display", 'none');
            d3.select(this)
                .style("fill", d3.interpolateTurbo(colorScale(d['variance'])));
        }

        // Title and description
        d3.select('header')
            .append('h1')
            .text('Monthly Global Land-Surface Temperature')
            .attr('id', 'title');
        d3.select('header')
            .append('h3')
            .text(`1753 - 2015: base temperature ${data['baseTemperature']} °C`)
            .attr('id', 'description');

        // Rectangles :D
        svg.selectAll("rect")
            .data(dataSet)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d['year']))
            .attr("y", (d) => yScale(1) - yScale(d['month']))
            .attr("height", (h - p.bottom) / 12)
            .attr("width", (w * 12) / dataSet.length)
            .attr("class", "cell")
            .attr("data-year", (d) => d['year'])
            .attr("data-month", (d) => d['month'] - 1)
            .attr("data-temp", (d) => (data['baseTemperature'] - d['variance']))
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
            .on('mousemove', mousemove)
            .style('fill', d => d3.interpolateTurbo(colorScale(d['variance'])))

        // Append axis
        svg.append("g")
            .attr("transform", "translate(0," + (h - p.bottom) + ")")
            .attr("id", "x-axis")
            .call(xAxis);
        svg.append("g")
            .attr("transform", "translate(" + p.left + ",0)")
            .attr("id", "y-axis")
            .call(yAxis);

        // Legend
        const legendValues = [2, 4, 6, 8, 10, 12];
        svg.append('g')
            .attr('id', 'legend');
        d3.select('#legend')
            .selectAll('text')
            .data(legendValues)
            .enter()
            .append('text')
            .attr('x', (d, i) => p.left + 8 + i * 50)
            .attr('y', h)
            .text(d => `${d} °C`);
        d3.select('#legend')
            .selectAll('rect')
            .data(legendValues)
            .enter()
            .append('rect')
            .attr('width', 50)
            .attr('height', 50)
            .attr('x', (d, i) => p.left + i * 50)
            .attr('y', h - 80)
            .style('fill', d => d3.interpolateTurbo(colorScale(d - data['baseTemperature'])));
    });