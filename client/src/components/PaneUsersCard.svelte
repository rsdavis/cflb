
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
    import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'

    import store from '../store/store.js'

    export let user
    export let contest

    $: info = user.info.data
    $: ratingsLength = user.ratings.status === 'DONE' ? user.ratings.data.length : null
    $: loading = user.info.status === 'PENDING' || user.ratings.status === 'PENDING' || user.problemResults.status === 'PENDING'

    let open = true

    function toggle () {
        open = !open
    }

    function handleClose () {
        store.toggleUser(user.info.data.handle)
    }

    function upperCase (string) {
        return string.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')
    }

    function preload(src) {
        return new Promise(resolve => {
            const img = new Image()
            img.onload = resolve
            img.src = src
        })
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
        { #if user.aux.avatar }
            { #await preload(user.aux.avatar) }
                <img src='no-avatar.jpg' alt="Pending avatar"/>
            { :then _ }
                <img src={user.aux.avatar} alt="User avatar"/>
            { /await }
        { :else }
            <img src='no-avatar.jpg' alt="No avatar"/>
        { /if }
    </div>

    <div class="header-handle">
        {user.handle}
    </div>

    <button class="header-close" on:click={() => handleClose(user)}>
        <div class="icon" class:spin={loading}>
            { #if loading }
                <Icon icon={faSpinner}/>
            { :else }
                <Icon icon={faTimes}/>
            { /if }
        </div>
    </button>

</div>

{ #if open }

    <div class='info'>

        { #if info.firstName && info.lastName }
            <div class='icon icon-blue stats-user-icon'><Icon icon={faUser}/></div>
            <span class='stats-user-name'>{ info.firstName } { info.lastName }</span>
        { /if }

        { #if info.country }
            <span class='icon icon-green stats-country-icon'><Icon icon={faGlobe}/></span>
            <span class='stats-country-name'>{ info.country }</span>
        { /if }

        { #if info.rank }
            <span class='icon icon-yellow stats-rank-icon'><Icon icon={faTrophy}/></span>
            <span class='stats-rank-name'>{ upperCase(info.rank) }</span>
        { /if }

    </div>

    <ul class='stats'>
        
        { #if user.aux.rankIndex }
            <li>
                <div class="icon"><Icon icon={faAward}/></div>
                <div>{ user.aux.rankIndex }</div>
            </li>
        { /if }

        { #if info.rating }
        <li>
            <div class="icon"><Icon icon={faMedal}/></div>
            <div>{ info.rating }</div>
        </li>
        { /if }

        { #if ratingsLength }
            <li>
                <div class="icon"><Icon icon={faHashtag}/></div>
                <div>{ ratingsLength }</div>
            </li>
        { /if }

        { #if info.contribution !== null && info.contribution !== undefined }
            <li>
                <div class="icon"><Icon icon={faStar}/></div>
                <div>{ info.contribution }</div>
            </li>
        { /if }
    </ul>


    { #if contest.status === 'DONE' }

        <div class='contest-name'>
            { contest.data.name }
        </div>

        { #if user.problemResults.data.length }

            <div class="results">

                { #each contest.data.problems as problem, i }

                    <span class='results-index'>({ problem.index })</span>

                    <span class='results-name'>{ problem.name }</span>

                    { #if user.problemResults.data[i].rejectedAttemptCount }
                        <span class="icon results-bug-icon"><Icon icon={faBug}/></span>
                        <span class="results-bug-count">
                            { user.problemResults.data[i].rejectedAttemptCount }
                        </span>
                    { /if }

                    { #if user.problemResults.data[i].points }
                        <span class='icon color-green results-check'>
                            <Icon icon={faCheck}/>
                        </span>
                    { /if }

                    <span class='results-points' class:color-green={user.problemResults.data[i].points }>
                        { user.problemResults.data[i].points }
                    </span>

                    <span class='results-sep'>/</span>

                    { #if problem.points }
                        <span class='results-total'>{ problem.points }</span>
                    { :else }
                        <span class='results-total'>1</span>
                    { /if }

                { /each }

            </div>

        { :else if user.problemResults.status === 'DONE' }
            <span style='font-size: 0.9rem;'>Did not participate</span>
        { /if }

    { /if }

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
        height: 50px;
        width: 50px;
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
        width: 100%;
        border-radius: 10px;
        object-fit: cover;
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
        border: 0px solid rgb(150,150,150);
        background-color: rgb(70,70,70);
        padding: 0.5em;
        flex-grow: 1;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 33%;
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

    .icon-green {
        color: green;
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

</style>