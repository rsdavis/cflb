
<script>

    import axios from 'axios'
    import Icon from 'fa-svelte'
    import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

    import store from '../store/store.js'
    import SearchStore from '../store/SearchStore.js'

    let query

    function handleInput () {
        SearchStore.updateQuery(query)
    }

    function format (user) {
        if (user.firstName && user.lastName) {
            return `${user.handle} (${user.firstName} ${user.lastName})`
        }
        else {
            return user.handle
        }
    }

</script>

<div class="container">

    <div class='input-container'>
        <Icon class='input-icon' icon={faSearch} />
        <input type="text"  bind:value={query} on:input={handleInput}>
    </div>

    { #if $SearchStore.query.length }

        { #await $SearchStore.queryRequestPromise }

            <ul>
                { #each $SearchStore.queryRequestData as user }
                    <li>{ format(user) }</li>
                { /each }
            </ul>

        { :then res }

            { #if $SearchStore.queryRequestData.length }
                <ul>
                    { #each $SearchStore.queryRequestData as user }
                        <li>{ format(user) }</li>
                    { /each }
                </ul>
            { :else }
                No results found
            {/if}

        { /await }

    { :else }

        { #await $SearchStore.topRequestPromise }

            ...

        { :then res }

            <ul class='search scrollbar'>

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

            </ul>

        { /await }

    { /if }


</div>

<style>

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .input-container {
        padding: 0.5em;
        position: relative;
    }

    .input-container :global(.input-icon) {
        position: absolute;
        left: 1em;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(70, 70, 70);
    }

    input {
        width: 100%;
        border: none;
        border-radius: 20px;
        margin: 0 auto;
        display: block;
        padding: 0.5em 1em 0.5em calc(2.5em - 2px);
        outline: none;
        border: 2px solid rgb(45,45,45);
        font-family: inherit;
        font-size: inherit;
    }

    input:focus {
        border: 2px solid rgb(160,185,210);
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
        width: 2.5em;
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