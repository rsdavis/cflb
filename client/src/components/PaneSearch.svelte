
<script>

    import axios from 'axios'

    import store from '../store/store.js'

    const promise = axios.get('http://localhost:3000/api/top')


</script>

<div class="container">

    <ul class='search scrollbar'>

        { #await promise }
            ...
        { :then res }

            { #each res.data as user, index }

                <li 
                    on:click={() => store.toggleUser(user.handle)} 
                    class:selected={$store.users.has(user.handle)}
                >
                    <span class="rank">{ index + 1 }</span>
                    <span class="handle">{ user.handle }</span>
                    <span class="rating">{ user.rating }</span>
                </li>

            { /each }

        { /await }

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