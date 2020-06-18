const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const port = 9000

app.get('/testAPI',(req,res) => {
    res.send({message:'Hey'});
});

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})