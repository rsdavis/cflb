
import { derived } from 'svelte/store'

import store from './store.js'

const { subscribe } = derived(store, $store => {

    let items = []

    $store.users.forEach(user => {
        if (user.ratings.status === 'DONE') {
            user.ratings.data.map(d => Object.assign(d, { selectionIndex: user.selectionIndex }))
            items = items.concat(user.ratings.data)
        }
    })

    return { items }

})

export default { subscribe }