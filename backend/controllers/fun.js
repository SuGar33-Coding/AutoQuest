const hi = (req, res, next) => {
    res.send({
        1: 'a',
        2: 'b',
        3: 'c'
    })
}

module.exports = {
    hi
}