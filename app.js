const express = require('express');
const app = express();
const routes = require('./routes/route')
const connectDB = require('./DB/connect')
require('dotenv').config()


//middleware
app.use(express.static('./public'))
app.use(express.json())


//routes

app.use('/api/v1/energy', routes) //middleware



const PORT = 4000;
const start = async() => {
    try {
        await connectDB (process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}....`))
    } catch (error) {
        console.log(error)
    }
}

start() //invoking the function