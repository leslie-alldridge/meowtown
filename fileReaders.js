const fs = require('fs')

writeCats = (path, cats, cb) => {
    fs.writeFile(path, JSON.stringify(cats, null, 2), cb)
}

readCats = (path, cb) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) cb(err)
        else cb(null, JSON.parse(data))
    })
}

module.exports = {
    writeCats,
    readCats
}