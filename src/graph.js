
import * as d3 from 'd3'

class Graph {

    constructor (elementId) {

        this.svg = d3.select('#' + elementId)

        this.width = 0
        this.height = 0

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

    resize ({ width, height }) {
        this.width = width
        this.height = height
        this._draw()
    }

    addUser (user) {

        const _user = user.map(d => {
            d['t'] = new Date(d.ratingUpdateTimeSeconds*1000)
            return d
        })

        this.users.push(_user)

        this.svg.select('#paths').append('path').data([_user])

    }

    _draw () {

        const ymin = 0
        const ymax = 4000

        const tscale = d3.scaleTime().domain([ this.tmin, this.tmax ]).range([ 0, this.width ])
        const yscale = d3.scaleLinear().domain([ ymin, ymax ]).range([ this.height, 0 ])

        const xaxis = d3.axisBottom(tscale).ticks(d3.timeYear.every(1)).tickSize(this.height)
        const yaxis = d3.axisRight(yscale).tickSize(this.width)

        this.xaxisGroup.call(xaxis)
        this.yaxisGroup.call(yaxis)

        // move y axis tick labels up
        this.svg.selectAll('.xaxis .tick text').attr('y', this.height-15).attr('dx', 15)
        this.svg.selectAll('.xaxis .tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')

        this.svg.selectAll('.yaxis .tick text').attr('x', 10).attr('dy', -4)
        this.svg.selectAll('.yaxis .tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2')

        // remove the axis line
        this.svg.selectAll('.domain').remove()

        const line = d3.line().x(d => tscale(d.t)).y(d => yscale(d.newRating))

        for (const user of this.users) {

            const halos = this.svg.select('#halos').selectAll('circle').data(user)
            const nodes = this.svg.select('#nodes').selectAll('circle').data(user)

            nodes.enter()
                .append('circle')
                .attr('cx', d => tscale(d.t))
                .attr('cy', d => yscale(d.newRating))
                .attr('r', 3)
                .attr('fill', d3.rgb(245, 245, 174))

            nodes
                .attr('cx', d => tscale(d.t))
                .attr('cy', d => yscale(d.newRating))

            halos.enter()
                .append('circle')
                .attr('cx', d => tscale(d.t))
                .attr('cy', d => yscale(d.newRating))
                .attr('r', 8)
                .attr('fill', d3.rgb(45,45,45))

            halos
                .attr('cx', d => tscale(d.t))
                .attr('cy', d => yscale(d.newRating))


        }

        this.svg.select('#paths').selectAll('path').attr('fill', 'none').attr('stroke', d3.rgb(245,225,174)).attr('stroke-width', 1).attr('d', line)

    }

}

export default Graph