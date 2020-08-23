

<script>

    import PaneUsersCard from './PaneUsersCard.svelte'
    import store from '../store/store.js'

    $: users = Array.from($store.selectedUsers, ([k,v]) => {

        console.log(v)

        return {
            firstName: v.firstName,
            lastName: v.lastName,
            handle: v.handle,
            rank: v.rank,
            country: v.country,
            city: v.city,
            rating: v.rating,
            avatar: v.avatar,
            contribution: v.contribution,
            selectedContest: v.selectedContest
        }

    })

    function handleClose (user) {
        store.deselectUser(user)
    }

</script>

<ul>

    { #each users as user}

        <li>

            <PaneUsersCard { user } />

        </li>

    { /each }

</ul>

<style>

    ul {
        overflow-y: scroll;
        height: 100%;
    }

    li {
        padding: 0.5em;
    }

    li + li {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

</style>