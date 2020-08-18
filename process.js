
const fs = require('fs')

const raw = fs.readFileSync('data.json')

const data = JSON.parse(raw)


const top100 = data.filter((d, i) => i < 100).map(({ rating, handle, avatar, rank }) => ({ rating, handle, avatar, rank }))
const userHandles = data.map(user => user.handle)

fs.writeFileSync('top100.json', JSON.stringify(top100, null, 4))
fs.writeFileSync('userHandles.json', JSON.stringify(userHandles, null, 4))
