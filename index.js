const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler')

const app = express()
const port = process.env.PORT || 3500


app.use(express.json())

const whiteList = ["http://127.0.0.1:5500/"]
const options = {
    origin: (origin, callback) => {
        console.log(whiteList.includes(origin) || !origin);
        if (whiteList.includes(origin) !== 1) {
            callback(null, true)
        }else{
            callback(new Error('No permitido'))
        }
    }
}
app.use(cors(options))

app.get('/', (req, res) => {
    res.send('Hello world')
})
routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log('My port is '+port)
})
