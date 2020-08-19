
import * as d3 from 'd3'

class Graph {

    constructor (elementId) {

        this.svg = d3.select('#' + elementId)

        const tmin = d3.timeYear.offset(new Date(), -3)
        const tmax = new Date()

        const ymin = 0
        const ymax = 4000

        this.x = d3.scaleTime().domain([ tmin, tmax ])
        this.y = d3.scaleLinear().domain([ ymin, ymax ])

        this.transform = d3.zoomIdentity

        this.xt = this.transform.rescaleX(this.x).interpolate(d3.interpolateRound)
        this.yt = this.transform.rescaleY(this.y).interpolate(d3.interpolateRound)

        this.xf = d3.axisBottom(this.xt)
        this.yf = d3.axisRight(this.yt)

        this.xg = this.svg.append('g').attr('id', 'xg').call(this.xf)
        this.yg = this.svg.append('g').attr('id', 'yg').call(this.yf)

        this.users = []
        this.paths = {}

        this.svg.append('g').attr('id', 'paths')
        this.svg.append('g').attr('id', 'halos')
        this.svg.append('g').attr('id', 'nodes')

        this.zoom = d3.zoom().scaleExtent([0.5, 10]).on('zoom', this.zoomed.bind(this))

        this.svg.call(this.zoom)

        this.items = []

    }

    zoomed() {

        this.transform = d3.event.transform
        this.drawAxes()
        this.drawPoints()
        
    }

    drawAxes () {

        this.x.range([ 0, this.width ])
        this.y.range([ this.height, 0 ])

        this.xt = this.transform.rescaleX(this.x).interpolate(d3.interpolateRound)
        this.yt = this.transform.rescaleY(this.y).interpolate(d3.interpolateRound)

        this.xf.scale(this.xt).tickSize(this.height)
        this.yf.scale(this.yt).tickSize(this.width)

        this.xg.call(this.xf)
        this.yg.call(this.yf)

        this.svg.selectAll('#xg .tick text').attr('y', 15).attr('dx', 20)
        this.svg.selectAll('#xg .tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')

        this.svg.selectAll('#yg .tick text').attr('x', 10).attr('dy', -4)
        this.svg.selectAll('#yg .tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')

        this.svg.selectAll('.domain').remove()

    }

    drawPoints () {

        const nodes = this.svg.select('#nodes').selectAll('circle').data(this.items, d => d.id)

        nodes.enter()
            .append('circle')
            .attr('cx', d => this.xt(d.t))
            .attr('cy', d => this.yt(d.newRating))
            .attr('r', 3)
            .attr('fill', d3.rgb(245, 245, 174))

        nodes
            .attr('cx', d => this.xt(d.t))
            .attr('cy', d => this.yt(d.newRating))

        nodes.exit().remove()

    }

    _draw (handles, items, width, height) {

        console.log('draw', items.length)

        this.width = width
        this.height = height

        this.items = items

        this.drawAxes()
        this.drawPoints()

        // // NODES


        // // HALOS

        // const halos = this.svg.select('#halos').selectAll('circle').data(items, d => d.id)

        // halos.enter()
        //     .append('circle')
        //     .attr('cx', d => this.tscale(d.t))
        //     .attr('cy', d => this.yscale(d.newRating))
        //     .attr('r', 8)
        //     .attr('fill', d3.rgb(45,45,45))

        // halos
        //     .attr('cx', d => this.tscale(d.t))
        //     .attr('cy', d => this.yscale(d.newRating))

        // halos.exit().remove()

        // // PATHS

        // const line = d3.line().x(d => this.tscale(d.t)).y(d => this.yscale(d.newRating))
        // const paths = this.svg.select('#paths').selectAll('path').data(handles, h => h)

        // paths.enter()
        //     .append('path')
        //     .datum(h => items.filter(item => item.handle === h))
        //     .attr('fill', 'none')
        //     .attr('stroke', d3.rgb(245,255,174))
        //     .attr('stroke-width', 1)
        //     .attr('d', line)

        // paths.exit().remove()



    }

}

export default Graph