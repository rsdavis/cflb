
import { writable } from 'svelte/store'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import top100Data from '../data/top100.json'

const initStore = {
    users: new Map(),
    contest: {
        id: null,
        status: 'NONE',
        data: {}
    }
}

const initUser = {
    info: {
        status: 'PENDING',
        data: {}
    },
    ratings: {
        status: 'PENDING',
        data: []
    },
    problemResults: {
        status: 'NONE',
        data: []
    }
}


const { subscribe, update } = writable(initStore)


function addUserInfo (handle, status, data) {

    update(store => {

        if (store.users.has(handle) === false) {
            console.error('User state not available: ', handle)
        }

        const user = store.users.get(handle)

        user.info = { status, data }

        store.users.set(handle, user)

        return store

    })

}

function addUserRatings (handle, status, data) {

    data = data.map(r => Object.assign(r, { id: uuidv4(), t: new Date(r.ratingUpdateTimeSeconds*1000) }))

    update (store => {

        if (store.users.has(handle) === false) {
            console.error('User state not available: ', handle)
        }

        const user = store.users.get(handle)

        user.ratings = { status, data }

        store.users.set(handle, user)

        return store

    })

}


function toggleUser (handle) {

    update(store => {

        // delete user if already selected

        if (store.users.has(handle)) {
            store.users.delete(handle)
            return store
        }

        // add user

        const newUser = JSON.parse(JSON.stringify(initUser))
        store.users.set(handle, newUser) 

        // fetch user info

        const userInfo = top100Data.find(d => d.handle === handle)

        if (userInfo) {
            addUserInfo(handle, 'DONE', userInfo )
        }
        else {
            addUserInfo(handle, 'ERROR', {})
        }

        // fetch user ratings

        axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`)
            .then(res => addUserRatings(handle, 'DONE', res.data.result))
            .catch(err => {
                console.error('Error fetching user ratings: ', handle)
                console.error(err)
                addUserRatings(handle, 'ERROR', [])
            })

        // fetch user problemResults for contest

        if (store.contest.id) {

            const url = `https://codeforces.com/api/contest.standings?handles=${handle}&contestId=${store.contest.id}`

            const user = store.users.get(handle)
            user.problemResults.status = 'PENDING'
            user.problemResults.data = []
            store.users.set(handle, user)

            axios.get(url)
                .then(res => {
                    addContest(store.contest.id, 'DONE', res.data.result)
                })
                .catch(err => {
                    console.error(err)
                    addContest(store.contest.id, 'ERROR', {})
                })

        }

        return store

    })

}

function addContest (contestId, status, data) {

    update(store => {

        if (contestId !== store.contest.id) {
            return store
        }

        if (status === 'ERROR') {
            store.contest.status = status
            store.contest.data = {}
            store.users.forEach(user => {
                user.problemResults.status = status
                user.problemResults.data = []
            })
            return store
        }

        const contest = data.contest
        const problems = data.problems

        Object.assign(contest, { problems })

        store.contest.status = status
        store.contest.data = contest

        data.rows.forEach(row => {
            row.party.members.forEach(member => {
                if (store.users.has(member.handle)) {
                    const user = store.users.get(member.handle)
                    user.problemResults.status = status
                    user.problemResults.data = [ ...row.problemResults ]
                    store.users.set(member.handle, user)
                }
            })
        })

        return store

    })

}

function selectContest (contestId) {

    update(store => {

        // reset contest

        store.contest.id = contestId
        store.contest.status = 'PENDING'
        store.contest.data = {}

        // reset users

        store.users.forEach(user => {
            user.problemResults = Object.assign({}, { status: 'PENDING', data: [] })
        })

        // fetch contest standings for selected users

        const handles = Array.from(store.users.keys()).join(';')

        const url = `https://codeforces.com/api/contest.standings?handles=${handles}&contestId=${contestId}`

        axios.get(url)
            .then(res => addContest(contestId, 'DONE', res.data.result))
            .catch(err => {
                console.error(err)
                addContest(contestId, 'ERROR', {})
            })

        return store

    })

}


export default { subscribe, toggleUser, selectContest }
