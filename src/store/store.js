
import { writable } from 'svelte/store'
import produce from 'immer'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const init = {
    selectedUsers: new Map()
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


function addSelectedContest (handle, contest) {

    console.log(contest)

    update(store => {

        if (store.selectedUsers.has(handle)) {
            const user = store.selectedUsers.get(handle)
            store.selectedUsers.set(handle, Object.assign(user, { selectedContest: contest }))
            console.log('set', handle)
        }

        return store

    })

}

function selectContest (contestId, handle) {

    update(store => {

        if (store.selectedUsers.has(handle)) {

            const url = `https://codeforces.com/api/contest.standings?handles=${handle}&contestId=${contestId}`

            axios.get(url)
                .then(res => addSelectedContest(handle, res.data.result))
                .catch(err => console.error(err))

        }

        return store

    })

}

export default { subscribe, selectUser, deselectUser, selectContest }
