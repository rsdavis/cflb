
import * as d3 from 'd3'

class Graph {

    constructor (elementId) {

        this.svg = d3.select('#' + elementId)

        this.tmin = d3.timeYear.offset(new Date(), -3)
        this.tmax = new Date()

        this.users = []
        this.paths = {}

        this.xaxisGroup = this.svg.append('g').attr('class','xaxis')
        this.yaxisGroup = this.svg.append('g').attr('class','yaxis')

        this.svg.append('g').attr('id', 'paths')
        this.svg.append('g').attr('id', 'halos')
        this.svg.append('g').attr('id', 'nodes')

    }

    _draw (handles, items, width, height) {

        console.log('draw', items.length)

        const ymin = 0
        const ymax = 4000

        const tscale = d3.scaleTime().domain([ this.tmin, this.tmax ]).range([ 0, width ])
        const yscale = d3.scaleLinear().domain([ ymin, ymax ]).range([ height, 0 ])

        const xaxis = d3.axisBottom(tscale).ticks(d3.timeYear.every(1)).tickSize(height)
        const yaxis = d3.axisRight(yscale).tickSize(width)

        this.xaxisGroup.call(xaxis)
        this.yaxisGroup.call(yaxis)

        // move y axis tick labels up
        this.svg.selectAll('.xaxis .tick text').attr('y', height-15).attr('dx', 15)
        this.svg.selectAll('.xaxis .tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')

        this.svg.selectAll('.yaxis .tick text').attr('x', 10).attr('dy', -4)
        this.svg.selectAll('.yaxis .tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')

        // remove the axis line
        this.svg.selectAll('.domain').remove()

        const line = d3.line().x(d => tscale(d.t)).y(d => yscale(d.newRating))

        const halos = this.svg.select('#halos').selectAll('circle').data(items, d => d.id)
        const nodes = this.svg.select('#nodes').selectAll('circle').data(items, d => d.id)

        nodes.enter()
            .append('circle')
            .attr('cx', d => tscale(d.t))
            .attr('cy', d => yscale(d.newRating))
            .attr('r', 3)
            .attr('fill', d3.rgb(245, 245, 174))

        nodes
            .attr('cx', d => tscale(d.t))
            .attr('cy', d => yscale(d.newRating))

        nodes.exit().remove()

        halos.enter()
            .append('circle')
            .attr('cx', d => tscale(d.t))
            .attr('cy', d => yscale(d.newRating))
            .attr('r', 8)
            .attr('fill', d3.rgb(45,45,45))

        halos
            .attr('cx', d => tscale(d.t))
            .attr('cy', d => yscale(d.newRating))

        halos.exit().remove()

        // this.svg.select('#paths').selectAll('path').attr('fill', 'none').attr('stroke', d3.rgb(245,225,174)).attr('stroke-width', 1).attr('d', line)

    }

}

export default Graph