

<script>

    import Icon from 'fa-svelte'
    import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
    import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
    import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
    import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'

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
            contribution: v.contribution
        }

    })

</script>

<ul>

    { #each users as user}
        <li>
            <div class="avatar">
                <img src={user.avatar} alt="Avatar"/>
            </div>
            {user.handle}
            <div class='stats'>
                <Icon icon={faUser}/>
                <span>{ user.firstName } { user.lastName }</span>
                <Icon icon={faTrophy}/>
                <span>{ user.rank }</span>
                <Icon icon={faGlobe}/>
                <span>{ user.country }</span>
                <Icon icon={faStar}/>
                <span>{ user.contribution } Contribution</span>
            </div>
        </li>
    { /each }

</ul>

<style>

    li + li {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .avatar {
        width: 80px;
    }

    img {
        border-radius: 50%;
    }

    .stats {
        display: grid;
        grid-template-columns: 1fr 5fr;
    }

</style>