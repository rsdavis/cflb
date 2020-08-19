
import { writable } from 'svelte/store'
import produce from 'immer'
import axios from 'axios'

const init = {
    selectedUsers: new Map()
}

const { subscribe, update } = writable(init)

function selectUser (user) {

    const copy = Object.assign(user, { status: 'FETCHING' })

    axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)
        .then(res => {
            addUserRatings(user.handle, res.data.result)
        })
        .catch(err => {
            console.error('Could not fetch data for user: ', user.handle)
        })

    update(store => {
        store.selectedUsers.set(copy.handle, copy)
        return store
    })

}

function addUserRatings (handle, ratings) {

    update(store => {

        if (store.selectedUsers.has(handle)) {
            const user = store.get(handle)
            user['status'] = 'DONE'
            user['ratings'] = data
        }
        else {
            console.error('Store could not add ratings for user: ', handle)
        }

    })

}

function deselectUser (user) {

    update(store => {
        store.selectedUsers.delete(user.handle)
        return store
    })

}

export default { subscribe, selectUser, deselectUser }
