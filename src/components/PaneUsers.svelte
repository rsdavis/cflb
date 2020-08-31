

<script>

    import PaneUsersCard from './PaneUsersCard.svelte'
    import store from '../store/store.js'

    $: userList = Array.from($store.users.values()).filter(user => user.info.status === 'DONE')

</script>

<ul>

    { #each userList as user }

        <li>
            <PaneUsersCard { user } contest={$store.contest}/>
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