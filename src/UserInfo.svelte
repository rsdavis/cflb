

<script>

    import Icon from 'fa-svelte'
    import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
    import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
    import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
    import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
    import { faBug } from '@fortawesome/free-solid-svg-icons/faBug'
    import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'

    import store from './store.js'

    $: users = Array.from($store.selectedUsers, ([k,v]) => {

        console.log(v)

        return {
            firstName: v.firstName,
            lastName: v.lastName,
            handle: v.handle,
            rank: v.rank,
            country: v.country,
            city: v.city,
            avatar: v.avatar,
            contribution: v.contribution,
            selectedContest: v.selectedContest
        }

    })

</script>

<ul>

    { #each users as user}
        <li>

            <div class="handle">
                {user.handle}
            </div>

            <div class="info">

                <div class='info-stats'>
                    <span class='icon icon-blue stats-user-icon'><Icon icon={faUser}/></span>
                    <span class='stats-user-name'>{ user.firstName } { user.lastName }</span>
                    <span class='icon icon-blue stats-country-icon'><Icon icon={faGlobe}/></span>
                    <span class='stats-country-name'>{ user.country }</span>
                    <span class='icon icon-yellow stats-rank-icon'><Icon icon={faTrophy}/></span>
                    <span class='stats-rank-name'>{ user.rank }</span>
                    <span class='icon icon-yellow stats-contribution-icon'><Icon icon={faStar}/></span>
                    <span class='stats-contribution-name'>{ user.contribution } Contribution</span>
                </div>

                <div class="info-avatar">
                    <img src={user.avatar} alt="Avatar"/>
                </div>

            </div>



            { #if user.selectedContest }

                <div class='contest-name'>
                    { user.selectedContest.contest.name }
                </div>

                <div class='results'>

                    { #each user.selectedContest.problems as problem, i }

                        <span class='results-index'>{ problem.index }</span>

                        <span class='results-name'>{ problem.name }</span>

                        { #if user.selectedContest.rows[0].problemResults[i].rejectedAttemptCount }
                            <span class='results-bugs'>
                                <span class='bug-icon'><Icon icon={faBug}/></span>
                                { user.selectedContest.rows[0].problemResults[i].rejectedAttemptCount }
                            </span>
                        { /if}

                        { #if user.selectedContest.rows[0].problemResults[i].points }
                            <span class='results-check'>
                                <Icon icon={faCheck}/>
                            </span>
                        { /if }

                        <span class='results-points'>{ user.selectedContest.rows[0].problemResults[i].points }</span>

                        { #if problem.points }
                            <span class='results-total'>/ { problem.points }</span>
                        { :else }
                            <span class='results-total'>/ 1</span>
                        { /if }

                    { /each }

                </div>

            {/if}

        </li>
    { /each }

</ul>

<style>

    ul {
        overflow-y: scroll;
        height: 100%;
    }

    li + li {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .handle {
        padding: 1em 0;
    }

    .info {
        display: flex;
    }

    .info-stats {
        display: grid;
        grid-gap: 0.25em;
        grid-template-columns: auto 5fr;
        flex-grow: 2;
    }

    .info-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }

    img {
        border-radius: 50%;
    }

    .icon {
        width: 100%;
        height: 100%;
    }

    .icon-yellow {
        color: rgb(245,245,174);
    }

    .icon-blue {
        color: rgb(160,185,210);
    }

    .contest-name {
        font-weight: 600;
        padding: 0.5em 0;
    }

    .results {
        display: grid;
        grid-gap: 0.25em;
        grid-template-columns: auto 1fr auto auto auto auto;
    }

    .results-index {
        grid-column: 1;
    }

    .results-name {
        overflow: hidden;
        text-overflow: ellipsis;
        grid-column: 2;
    }

    .results-bugs {
        grid-column: 3;
    }

    .results-check {
        grid-column: 4;
        font-size: 14px;
        color: green;
    }

    .results-points {
        text-align: right;
        grid-column: 5;
    }

    .results-total {
        text-align: right;
        grid-column: 6;
    }


    .bug-icon {
        font-size: 14px;
        color: red;
    }

</style>