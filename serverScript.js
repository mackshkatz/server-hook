express = require('express')
app = express.createServer()


app.post('/', (req, res) ->
console.log req
app.listen(3000)

console.log req.body
res.send('oh hai')