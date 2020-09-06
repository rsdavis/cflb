
const StartServer = require('./Server.js')
const { LoadUserSearchFromJSON, LoadUserSearchFromAPI } = require('./UserSearch.js')

async function main () {

    try {

        console.log(new Date(), 'Load user search')
        // const userSearch = await LoadUserSearchFromJSON('./data/data.json')
        const userSearch = await LoadUserSearchFromAPI()

        console.log(new Date(), 'start server')
        const server = await StartServer(userSearch)

        console.log('done')
    }
    catch (err) {
        console.error(new Date(), 'Error')
        console.error(err)
    }

}

main()