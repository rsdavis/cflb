const { default: Axios } = require("axios");

const fs = require('fs')
const axios = require('axios')

axios({
    method: 'GET',
    url: 'https://codeforces.com/api/user.ratedList'
}).then(res => {
    const data = JSON.stringify(res.data.result, null, 4)
    fs.writeFileSync('data.json', data)
})