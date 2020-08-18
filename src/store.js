
import { writable } from 'svelte/store'
import produce from 'immer'

const init = {
    selectedUsers: new Map()
}

const { subscribe, update } = writable(init)

function selectUser (user) {

    update(store => {
        store.selectedUsers.set(user.handle, user)
        return store
    })

}

function deselectUser (user) {

    update(store => {
        store.selectedUsers.delete(user.handle)
        return store
    })

}

export default { subscribe, selectUser, deselectUser }
