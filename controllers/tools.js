import { User } from '../models/userSchema.js'
import bcrypt from 'bcrypt';


export async function saveUser(userDetails) {

    // hashpasswords
    //bcrypt.hash takes two arguments; 
    // a string and a number, representing the numeber of rounds for hashing
    const hash = await bcrypt.hash(userDetails.password, 13)
    console.log('hashedPassword', hash)

    userDetails.password = hash

    

    try {
        // match the mongoose schema with the response 
        // mongoose automatically validates against them including 
        const newUser = new User({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password
        })

        const saveUser = await newUser.save()
        console.log('---> sucess')

        return saveUser

     } catch (err) {
        console.log(`error in tools.js, saveUserFn ---->`, err)
    }


}

export async function getAllData() {
    try {
        const data = await User.find()

        return data

        } catch (err) {
        console.log(err)
    }
}


export async function getById(userEmail){
    try { 
        const findByEmail = await User.find({email: userEmail})

        if (findByEmail.length === 0 || findByEmail === undefined) {
            return 'no user with such email was found'
        }

    return findByEmail
    } catch (err) {console.log(err) }
}






export async function validateLogin(loginCredenials) {

    if (loginCredenials.email === '' || loginCredenials.email === undefined) {

        return 'user name was not foud in request body'
    }

    const emailCred = loginCredenials.email;
    const passwordCred = loginCredenials.password;


    try { 
        // .find() method takes in an object as an argument
        // the object contains the property in question and value
        // it returns a resolve array of objects of data
        const isEmailFound = await User.find({email: `${emailCred}`})

        if (isEmailFound.length === 0 || isEmailFound === undefined) {
            return 'user does not exist on the system'
        }

        const userCredentials = isEmailFound[0]

        // check the password credentials against each other
        if (passwordCred !== userCredentials.password) {
            return 'invalid credentials'
        }

        return {status: 300, data: userCredentials, message: "User credentails are valid"}
        

    } catch (err) {
        console.warn('validateLogin--->', err)
    }
}