
<script>

    import axios from 'axios'
    import Icon from 'fa-svelte'
    import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

    import store from '../store/store.js'
    import SearchStore from '../store/SearchStore.js'

    function handleInput (event) {
        SearchStore.updateQuery(event.target.value)
    }

    function format (user) {
        if (user.firstName && user.lastName) {
            return `${user.handle} (${user.firstName} ${user.lastName})`
        }
        else {
            return user.handle
        }
    }


    function toggle (user) {
        store.toggleUser(user.handle, { rankIndex: user.rankIndex, avatar: user.avatar })
    }

</script>

<div class="container">

    <h1>CodeForcesGuru</h1>

    <div class='input-container'>
        <Icon class='input-icon' icon={faSearch} />
        <input type="text"  value={$SearchStore.query} on:input={handleInput}>
    </div>

    { #if $SearchStore.query.length }

        { #await $SearchStore.queryRequestPromise }

            <ul class='scrollable'>
                { #each $SearchStore.queryRequestData as user }
                    <li
                        on:click={() => toggle(user)}
                        class:selected={$store.users.has(user.handle)}
                    >
                        <span class="block ellipsis">{ format(user) }</span>
                     </li>
                { /each }
            </ul>

        { :then res }

            { #if $SearchStore.queryRequestData.length }

                <ul class='scrollable'>
                    { #each $SearchStore.queryRequestData as user }
                        <li
                            on:click={() => toggle(user)}
                            class:selected={$store.users.has(user.handle)}
                        >
                            <span class="block ellipsis">{ format(user) }</span>
                        </li>
                    { /each }
                </ul>

            { :else }
                <div style='padding: 0.5em;'>No results found</div>
            {/if}

        { /await }

    { :else }

        { #await $SearchStore.topRequestPromise }

            ...

        { :then res }

            <ul class='scrollable'>

                { #each res.data as user, index }

                    <li 
                        on:click={() => toggle(user)} 
                        class:selected={$store.users.has(user.handle)}
                    >
                        <span class="rank">{ index + 1 }</span>
                        <span class="handle ellipsis">{ user.handle }</span>
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

    h1 {
        margin: 0.5em auto 0 auto;
        font-family: inherit;
    }

    .input-container {
        position: relative;
        margin: 0.5em;
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
        flex-grow: 1;
        max-width: 70%;
    }

    .block {
        display: inline-block;
        width: calc(100%);
    }

    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .rating {
        width: 15%;
        color: rgb(180,180,180);
    }

</style>