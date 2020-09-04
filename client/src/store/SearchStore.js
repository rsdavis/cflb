

import { writable } from 'svelte/store'
import axios from 'axios'

const initStore = {
    topRequestPromise: null,
    queryRequestPromise: null,
    queryRequestData: [],
    query: ''
}

const { subscribe, update } = writable(initStore)

function initialRequest () {

    update(store => {

        store.topRequestPromise = axios.get(process.env.API_URL + '/api/top')
        return store

    })

}

function saveQueryData (query, data) {

    update(store => {

        if (store.query === query) {
            store.queryRequestData = data
        }

        return store

    })
}

function updateQuery (query) {

    update(store => {
        store.query = query

        if (query.length) {

            store.queryRequestPromise = axios.get(process.env.API_URL + `/api/query/${query}`)
            store.queryRequestPromise.then(res => saveQueryData(query, res.data))

        }

        return store
    })

}

initialRequest()

export default { subscribe, updateQuery }
