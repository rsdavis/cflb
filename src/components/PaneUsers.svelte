

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

    $: contest = $store.selectedContest.contest
    $: problems = $store.selectedContest && $store.selectedContest.problems
    $: problemResults = $store.selectedContest.rows && $store.selectedContest.rows.reduce((acc, item) => {
        item.party.members.forEach(m => acc[m.handle] = item.problemResults)
        return acc
    }, {})

    function handleClose (user) {
        store.deselectUser(user)
    }

</script>

<ul>

    { #each users as user}

        <li>

            <PaneUsersCard { user } { contest } { problems } problemResults={problemResults ? problemResults[user.handle] : [] } />

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