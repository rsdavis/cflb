
<script>

    import Icon from 'fa-svelte'
    import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
    import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
    import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
    import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
    import { faBug } from '@fortawesome/free-solid-svg-icons/faBug'
    import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
    import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
    import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
    import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
    import { faMedal } from '@fortawesome/free-solid-svg-icons/faMedal'
    import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'
    import { faHashtag } from '@fortawesome/free-solid-svg-icons/faHashtag'

    import store from '../store/store.js'

    export let user

    let open = true

    function toggle () {
        open = !open
    }

    function handleClose (user) {
        store.deselectUser(user)
    }

</script>

<div class="header">

    <button class='header-chevron' on:click={() => toggle()}>
        <div class="icon">
            { #if open }
                <Icon icon={faChevronDown}/>
            { :else }
                <Icon icon={faChevronRight}/>
            { /if }
        </div>
    </button>

    <div class="header-avatar">
        <img src={user.avatar} alt="Avatar"/>
    </div>

    <div class="header-handle">
        {user.handle}
    </div>

    <button class="header-close" on:click={() => handleClose(user)}>
        <div class="icon">
            <Icon icon={faTimes}/>
        </div>
    </button>

</div>

{ #if open }

    <div class='info'>
        <div class='icon icon-blue stats-user-icon'><Icon icon={faUser}/></div>
        <span class='stats-user-name'>{ user.firstName } { user.lastName }</span>
        <span class='icon icon-blue stats-country-icon'><Icon icon={faGlobe}/></span>
        <span class='stats-country-name'>{ user.country }</span>
        <span class='icon icon-yellow stats-rank-icon'><Icon icon={faTrophy}/></span>
        <span class='stats-rank-name'>{ user.rank }</span>
    </div>

    <ul class='stats'>
        <li>
            <div class="icon"><Icon icon={faAward}/></div>
            <div>1</div>
        </li>
        <li>
            <div class="icon"><Icon icon={faMedal}/></div>
            <div>{ user.rating }</div>
        </li>
        <li>
            <div class="icon"><Icon icon={faHashtag}/></div>
            <div>250</div>
        </li>
        <li>
            <div class="icon"><Icon icon={faStar}/></div>
            <div>{ user.contribution }</div>
        </li>
    </ul>


    { #if user.selectedContest }

        <div class='contest-name'>
            { user.selectedContest.contest.name }
        </div>

        <div class='results'>

            { #each user.selectedContest.problems as problem, i }

                <span class='results-index'>({ problem.index })</span>

                <span class='results-name'>{ problem.name }</span>


                { #if user.selectedContest.rows[0].problemResults[i].rejectedAttemptCount }
                    <span class="icon results-bug-icon"><Icon icon={faBug}/></span>
                    <span class="results-bug-count">
                        { user.selectedContest.rows[0].problemResults[i].rejectedAttemptCount }
                    </span>
                { /if }

                { #if user.selectedContest.rows[0].problemResults[i].points }
                    <span class='icon color-green results-check'>
                        <Icon icon={faCheck}/>
                    </span>
                { /if }

                <span class='results-points' class:color-green={user.selectedContest.rows[0].problemResults[i].points }>
                    { user.selectedContest.rows[0].problemResults[i].points }
                </span>

                <span class='results-sep'>/</span>

                { #if problem.points }
                    <span class='results-total'>{ problem.points }</span>
                { :else }
                    <span class='results-total'>1</span>
                { /if }

            { /each }

        </div>

    {/if}

{ /if }


<style>

    .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
    }

    .header-chevron {
        height: 100%;
        color: white;
        padding-right: 1em;
    }

    .header-avatar {
        height: 100%;
    }

    .header-handle {
        flex-grow: 1;
        padding-left: 1em;
    }

    .header-close {
        height: 100%;
        color: white;
        padding-left: 1em;
    }

    button:hover, button:focus {
        color: rgb(170,200,230);
        outline: none;
        border: none;
    }

    img {
        height: 100%;
        border-radius: 50%;
    }

    .info {
        display: grid;
        grid-gap: 0.25em;
        grid-template-columns: auto 5fr;
        flex-grow: 2;
        align-items: center;
        font-size: 0.9rem;
        margin-top: 0.5em;
    }

    ul.stats {
        margin: 0.5em 0;
        display: flex;
    }

    ul.stats > li {
        border: 1px solid rgb(150,150,150);
        padding: 0.5em;
        flex-grow: 1;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ul.stats .icon {
        margin-right: 0.5em;
    }

    li + li {
        margin-left: 0.5em;
    }

    .icon {
        width: 1em;
        height: 1em;
    }

    .icon-yellow {
        color: rgb(245,245,174);
    }

    .icon-blue {
        color: rgb(160,185,210);
    }

    .contest-name {
        color: rgb(245, 245, 174);
        margin: 0.5em 0;
        font-size: 0.9rem;
    }

    .results {
        display: grid;
        grid-gap: 0.25em;
        grid-template-columns: auto 1fr auto auto auto auto auto;
        font-size: 0.9rem;
    }

    .results-index {
        grid-column: 1;
    }

    .results-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        grid-column: 2;
    }

    .results-bug-icon {
        color: red;
        grid-column: 3;
    }

    .results-bug-count {
        color: red;
        grid-column: 4;
    }

    .color-green {
        color: green;
    }

    .results-check {
        grid-column: 5;
    }

    .results-points {
        text-align: right;
        grid-column: 6;
    }

    .results-sep {
        grid-column: 7;
    }

    .results-total {
        text-align: right;
        grid-column: 8;
    }

    .bug-icon {
        color: red;
    }

</style>