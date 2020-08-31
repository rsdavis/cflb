
import { derived } from 'svelte/store'

import store from './store.js'

const { subscribe } = derived(store, $store => {

    const handles = []
    let items = []

    $store.users.forEach((user, handle) => {
        if (user.ratings.status === 'DONE') {
            handles.push(handle)
            items = items.concat(user.ratings.data)
        }
    })

    return { handles, items }

})

export default { subscribe }