
const StartServer = require('./Server.js')
const { LoadUserSearchFromJSON } = require('./UserSearch.js')

async function main () {

    console.log('Load user search')
    const userSearch = await LoadUserSearchFromJSON('./data/data.json')

    console.log('start server')
    const server = await StartServer(userSearch)

    console.log('done')

}

main()