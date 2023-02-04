const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const members = require('./Members')

const app = express();


//Init Middileware
app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//HomePage Route
app.get("/", (req,res)=>{
    res.render("index", {
        title: "Members App",
        members
    });
})


// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
  
//Set static Folder
// app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server startd on ${PORT}`));