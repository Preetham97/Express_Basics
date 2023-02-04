const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

const app = express();


//Init Middileware
app.use(logger);

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
  
//Set static Folder
// app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server startd on ${PORT}`));