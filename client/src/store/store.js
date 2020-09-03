
import { writable } from 'svelte/store'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const initStore = {
    users: new Map(),
    contest: {
        id: null,
        status: 'NONE',
        data: {}
    }
}

const initUser = {
    handle: '',
    info: {
        status: 'PENDING',
        data: {}
    },
    aux: {
        rankIndex: null,
        avatar: null
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


function toggleUser (handle, aux) {

    update(store => {

        // delete user if already selected

        if (store.users.has(handle)) {
            store.users.delete(handle)
            return store
        }

        // add user
        const newUser = JSON.parse(JSON.stringify(initUser))
        newUser.handle = handle
        newUser.aux = aux
        store.users.set(handle, newUser) 

        // fetch user info

        axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
            .then(res => {
                if (res.data.status == 'OK') addUserInfo(handle, 'DONE', res.data.result[0])
                else addUserInfo(handle, 'ERROR', {})
            })
            .catch(err => {
                console.error('Error fetching user info: ', handle)
                addUserInfo(handle, 'ERROR', {})
            })

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
                    addContest(store.contest.id, 'DONE', res.data.result, handle)
                })
                .catch(err => {
                    console.error(err)
                    addContest(store.contest.id, 'ERROR', {}, handle)
                })

        }

        return store

    })

}

function addContest (contestId, status, data, handles) {

    update(store => {

        if (contestId !== store.contest.id) {
            return store
        }

        if (status === 'ERROR') {
            store.contest.status = status
            store.contest.data = {}
            handles.split(';').forEach(handle => {
                const user = store.users.get(handle)
                user.problemResults.status = status
                user.problemResults.data = []
                store.users.set(handle, user)
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
                    user.problemResults.data = [ ...row.problemResults ]
                    store.users.set(member.handle, user)
                }
            })
        })

        // set status

        handles.split(';').forEach(handle => {
            const user = store.users.get(handle)
            user.problemResults.status = 'DONE'
            store.users.set(handle, user)
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
            .then(res => addContest(contestId, 'DONE', res.data.result, handles))
            .catch(err => {
                console.error(err)
                addContest(contestId, 'ERROR', {}, handles)
            })

        return store

    })

}


export default { subscribe, toggleUser, selectContest }
