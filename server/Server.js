
const http = require('http')
const Koa = require('koa')
const Router = require('@koa/router')
const KoaCors = require('@koa/cors')
const KoaResponseTime = require('koa-response-time')

function sleep(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

function KoaDelay (timeout) {
    return async (ctx,next) => {
        await sleep(timeout)
        await next()
    }
}

class Server {

    constructor (userSearch) {

        this.userSearch = userSearch

        this.app = new Koa()
        const router = new Router()

        router.get('/api', this.healthCheck.bind(this))
        router.get('/api/top', this.top.bind(this))
        router.get('/api/query/:query', this.query.bind(this))

        this.app.use(this.logger)
        this.app.use(KoaResponseTime())
        // this.app.use(KoaDelay(1000))
        this.app.use(KoaCors())
        this.app.use(router.routes())

    }

    async logger (ctx, next) {
        await next()
        const rt = ctx.response.get('X-Response-Time')
        console.log(`${ctx.method} ${ctx.url} ${rt}`)
    }

    start (port = 3000) {

        const promise = new Promise((resolve, reject) => {
            this.server = http.createServer(this.app.callback()).listen(port, resolve)
        })

        return promise

    }

    async healthCheck (ctx) {
        ctx.body = 'ok'
    }

    async top (ctx) {
        ctx.body = this.userSearch.top()
    }

    async query (ctx) {
        ctx.body = this.userSearch.queryTrie(ctx.params.query).filter((d,i) => i<20)
    }

}

async function StartServer (userSearch) {
    const server = new Server(userSearch)
    await server.start()
    return server
}

module.exports = StartServer