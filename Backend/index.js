const express = require('express');
var cors = require('cors')
const connectToMongo = require('./db');
try {
    connectToMongo();
    console.log("connected to MOngoDB succesfully")
} catch (err){
    console.log("some error occured",err);
    process.exit(1);
}


const app = express()
const port = 5000


app.use(cors())

//middel ware function
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
    res.send('API is running!');
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
