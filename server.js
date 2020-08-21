const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');
const videoApi = require('./Node(Model&Routes)/Routes/api');
const userApi = require('./Node(Model&Routes)/Routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(path.join(__dirname,'dist/videoUploader')))

app.use('/api',videoApi);
app.use('/api',userApi);

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})