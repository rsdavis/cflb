
const fs = require('fs')
const TrieSearch = require('trie-search')
const axios = require('axios')

class UserSearch {

    constructor () {

        const reloadInterval = 60 // minutes
        this.data = []
        this.top100 = []
        this.trie = null
        this.interval = setInterval(this.reload.bind(this), reloadInterval * 60 * 1000)

    }

    async fetchUserRatedList () {

        console.log(new Date(), 'fetch')

        const method    = 'GET'
        const url       = 'https://codeforces.com/api/user.ratedList'
        const timeout   = 60000*2

        const f = async () => {
            try {
                console.log(new Date(), 'make call to codeforces')
                return await axios({ method, url, timeout })
            }
            catch (err) {
                console.warn(new Date(), 'Error')
                console.warn(new Date(), err.message)
                return f()
            }
        }

        const res = await f()

        return res.data.result

    }

    addRanks (data) {
        data = data.map((d, i) => Object.assign(d, { rankIndex: i+1 }))
    }

    createTrie (data) {

        console.log(new Date(), 'create trie')

        const newTrie = new TrieSearch(['handle', 'firstName', 'lastName'], { min: 1, ignoreCase: true })

        this.addRanks(data)

        newTrie.addAll(data)

        this.trie = newTrie
        this.data = data
        this.top100 = this.data.filter((d,i) => i<100)

    }

    queryTrie (query) {

        console.log(new Date(), 'query')

        const results = this.trie.get(query).map(({ handle, firstName, lastName, avatar, rankIndex }) => ({ handle, firstName, lastName, avatar, rankIndex }))

        return results

    }

    async reload () {
        try {
            console.log(new Date(), 'reload')
            const data = await this.fetchUserRatedList()
            this.createTrie(data)
        }
        catch (err) {
            console.error(new Date(), 'Error')
            console.error(err)
        }
    }

    top () {
        return this.top100
    }

}

async function LoadUserSearchFromJSON (fileName) {

    const raw = fs.readFileSync(fileName)
    const data = JSON.parse(raw)
    const userSearch = new UserSearch()
    userSearch.createTrie(data)
    return userSearch

}

async function LoadUserSearchFromAPI () {

    const userSearch = new UserSearch()
    const data = await userSearch.fetchUserRatedList()
    userSearch.createTrie(data)
    return userSearch

}

module.exports = { LoadUserSearchFromJSON, LoadUserSearchFromAPI }