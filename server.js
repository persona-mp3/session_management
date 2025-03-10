// library imports
import express from 'express';
import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';

// module imports
import connectionString from './env.json'  with {type: "json"}
import {User} from './models/userSchema.js'
import { saveUser, getAllData, getById, validateLogin } from './controllers/tools.js';


const app = express()
// serve static files for app to access
app.use(express.static("public"))
app.use(express.json())
app.set("view engine", "ejs")
const port = 8080
const dbConnection = connectionString.connectionString;


async function databaseConnection() {
    try {
        const dbConnection = connectionString.connectionString;
        const connection = await mongoose.connect(dbConnection);
        console.clear()
        console.log('<----connnection established---->')

        app.listen(port, ()=> {
            console.log('[listening....] on http://localhost:8080')
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


app.get('/a', async (req, res) => {
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



app.post('/user/login', async (req, res) => {
    const loginCredenials = req.body;
    console.log(loginCredenials)
    const isCredValid = await validateLogin(loginCredenials)
    const firstName = await isCredValid.data.firstName;
    console.log(firstName)
    const lastName = await isCredValid.data.lastName;
    const status = await isCredValid.status
    res.render('home', {firstName: firstName, lastName: lastName})
})