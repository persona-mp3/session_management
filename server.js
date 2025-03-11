// library imports
import express from 'express';
import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';
import morgan from 'morgan';

// module imports
import connectionString from './env.json'  with {type: "json"}
import {User} from './models/userSchema.js'
import { saveUser, getAllData, getById, validateLogin } from './controllers/tools.js';


const app = express()

// serve static files for app to access
app.use(express.static("public"))
app.use(express.json())
app.use(morgan('dev'))
app.use(session({
    secret: "cookieSecretGenerated",
    // avoid saving randomised sessions`
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60, 
        signed: true,
    }
}))

app.set("view engine", "ejs")
const port = 3000
const dbConnection = connectionString.connectionString;


async function databaseConnection() {
    try {
        const dbConnection = connectionString.connectionString;
        const connection = await mongoose.connect(dbConnection);
        console.clear()
        console.log('<----connnection established---->')

        app.listen(port, ()=> {
            console.log('[listening....] on http://localhost:3000/home')
        })

    } catch (err) {
        console.log(err, '<---error')
    }
}


databaseConnection()




/// sandbox routes
app.get('/', (req, res) =>{
    res.render('i2')
})


app.get('/signup', (req,res) => {
    res.render('signup')
})



app.post('/regis/user',  async (req, res) => {
    console.log(req.body)
    const userDetails = req.body;
    const response = await saveUser(userDetails)
    // console.log(reply, '<----reply')
    res.send(response)

})


app.get('/admin', async (req, res) => {
    const reply = await getAllData();

    res.send(reply)
})


app.get('/b', async (req, res) => {
    const email = {email: "funland@gmail.com"}
    const mongoResponse = await getById('funland@gmail.com');
    console.log(mongoResponse)
    res.send(mongoResponse)
})



app.get('/login', (req, res) => {
    res.render('login')
})


app.get('/base', (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited = t 
    rue
    res.send('ro')
})


app.post('/user/login', async (req, res) => {
    const loginCredenials = req.body;
    
    console.log(loginCredenials)

    const isCredValid = await validateLogin(loginCredenials)

    if (isCredValid === 0 || isCredValid === 1) {
        console.log('INVALID CREDS')
        res.send('NO')
        return;
    }

    const firstName = await isCredValid.data.firstName;
    const lastName = await isCredValid.data.lastName;
    const status = await isCredValid.status

    console.log('login session ==>', req.session)
    req.session.user = {firstName: firstName, lastName: lastName}
    res.redirect("/home")
})


app.get('/home', (req, res) => {
    if (!req.session.user) {
        console.log('not allowed access gang')
        return res.redirect('/login')
    }

    res.render('home', {user: req.session.user})
})


app.get('/docs', function (req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.end('views -->' + req.session.views)
        // res.write('expiration -->', req.session.cookie.maxAge / 1000)
        // res.end()
    } else {
        req.session.views = 1
        res.end('senzu beaned your session views')
    }
})

