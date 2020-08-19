
import { derived } from 'svelte/store'

import store from './store.js'

const { subscribe } = derived(store, $store => {

    const handles = []
    let items = []

    $store.selectedUsers.forEach((user, handle) => {
        if (user.status === 'DONE') {
            handles.push(handle)
            items = items.concat(user.ratings)
        }
    })

    return { handles, items }

})

export default { subscribe }