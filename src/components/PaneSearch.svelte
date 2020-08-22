
<script>

    import data from '../data/top100.json'
    import store from '../store/store.js'

    function handleSelect (user) {

        if ($store.selectedUsers.has(user.handle)) {
            store.deselectUser(user)
        }
        else {
            store.selectUser(user)
        }

    }

</script>

<div class="container">

    <ul class='search'>

        { #each data as user, index }

            <li 
                on:click={() => handleSelect(user)} 
                class:selected={$store.selectedUsers.has(user.handle)}
            >
                <span class="rank">{ index + 1 }</span>
                <span class="handle">{ user.handle }</span>
                <span class="rating">{ user.rating }</span>
            </li>

        { /each }

    </ul>

</div>

<style>

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    ul.search {
        overflow-y: scroll;
    }

    li {
        display: flex;
        padding: 0.5em;
    }

    li:hover {
        cursor: pointer;
        background-color: rgb(70,70,70);
    }

    li.selected {
        background-color: rgb(70,70,70);
    }

    span {
        padding: 0;
        margin: 0;
        display: inline-block;
    }

    .rank {
        text-align: left;
        width: 15%;
    }

    .handle {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        max-width: 70%;
    }

    .rating {
        width: 15%;
        color: rgb(180,180,180);
    }

</style>