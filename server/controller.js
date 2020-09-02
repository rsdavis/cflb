
const LoadUserSearch = require('./UserSearch.js')


async function f () {

    try {

        const userSearch = await LoadUserSearch()

        const results = userSearch.queryTrie('rda')

        console.log(results)

    }
    catch (err) {
        console.error(err)
    }

}

f()