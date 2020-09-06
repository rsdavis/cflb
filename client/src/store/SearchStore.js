

import { writable } from 'svelte/store'
import axios from 'axios'
import debounce from 'underscore/modules/debounce.js'

const initStore = {
    topRequestPromise: null,
    queryRequestPromise: null,
    queryRequestData: null,
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

function makeCall (query) {

    update(store => {

        store.queryRequestPromise = axios.get(process.env.API_URL + `/api/query/${query}`)
        store.queryRequestPromise.then(res => saveQueryData(query, res.data))

        return store

    })

}

const makeCallDebounced = debounce(makeCall, 500)

function updateQuery (query) {

    update(store => {
        store.query = query

        if (query.length) {
            makeCallDebounced(query)
        }
        else {
            store.queryRequestData = null
            makeCallDebounced.cancel()
        }

        return store
    })

}

initialRequest()

export default { subscribe, updateQuery }
