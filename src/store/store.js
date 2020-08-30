
import { writable } from 'svelte/store'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const init = {
    selectedUsers: new Map(),
    selectedContest: {}
}

const { subscribe, update } = writable(init)

function selectUser (user) {

    const copy = Object.assign({}, user, { status: 'FETCHING' })

    axios.get(`https://codeforces.com/api/user.rating?handle=${user.handle}`)
        .then(res => {
            addUserRatings(user.handle, res.data.result)
        })
        .catch(err => {
            console.error('Could not fetch data for user: ', user.handle)
            console.error(err)
        })

    update(store => {
        store.selectedUsers.set(copy.handle, copy)
        return store
    })

}

function addUserRatings (handle, ratings) {

    ratings = ratings.map(r => Object.assign(r, { id: uuidv4(), t: new Date(r.ratingUpdateTimeSeconds*1000) }))

    update(store => {

        if (store.selectedUsers.has(handle)) {
            const user = store.selectedUsers.get(handle)
            const status = 'DONE'
            store.selectedUsers.set(user.handle, Object.assign({}, user, { status, ratings }))
        }
        else {
            console.error('Store could not add ratings for user: ', handle)
        }

        return store

    })

}

function deselectUser (user) {

    update(store => {
        store.selectedUsers.delete(user.handle)
        return store
    })

}


function addSelectedContest (contest) {

    update(store => {
        store.selectedContest = contest
        return store
    })

}

function selectContest (contestId) {

    update(store => {

        // create handles string
        const handles = Array.from(store.selectedUsers.keys()).join(';')

        const url = `https://codeforces.com/api/contest.standings?handles=${handles}&contestId=${contestId}`

        axios.get(url)
            .then(res => addSelectedContest(res.data.result))
            .catch(err => console.err(err))

        return store

    })

}

export default { subscribe, selectUser, deselectUser, selectContest }
