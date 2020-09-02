

<script>

    import PaneUsersCard from './PaneUsersCard.svelte'
    import store from '../store/store.js'

    $: userList = Array.from($store.users.values()).filter(user => user.info.status === 'DONE')

</script>

<ul class='scrollbar'>

    { #each userList as user }

        <li>
            <PaneUsersCard { user } contest={$store.contest}/>
        </li>

    { /each }

</ul>

<style>

    ul {
        overflow-y: auto;
        height: 100%;
        scrollbar-color: red yellow;
    }

    li {
        padding: 0.5em;
        border-bottom: 1px solid #ccc;
    }

</style>