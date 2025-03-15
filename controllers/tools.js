import { User } from '../models/userSchema.js'
import bcrypt from 'bcrypt';
import envJSON from '../env.json' with {type: "json"};
// import quizJson from '../dynamic_form.json' with {type: "json"};



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
            return 0
        }

        const userCredentials = isEmailFound[0]

        // check the password credentials against each other
        if (passwordCred !== userCredentials.password) {
            return 1
        }

        return {status: 300, data: userCredentials, message: "User credentails are valid"}
        

    } catch (err) {
        console.warn('validateLogin--->', err)
    }
}


export const sandbox = async function() {

    const API_KEY = envJSON.API_KEY;
    const estimateId = `9b1e2132-6216-4c64-84b2-23cf31eb472d`
    const url = new URL(`https://www.carboninterface.com/api/v1/estimates/${estimateId}`);
    
    try { 
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            }
        });

        const data = await response.json()

        console.log('RESPONSE DATA --->', data)
        
        return data

    } catch (err) {
        console.warn(err)
    }

}

const API_KEY = envJSON.API_KEY;
const estimateId = `9b1e2132-6216-4c64-84b2-23cf31eb472d`
const url = new URL(`https://www.carboninterface.com/api/v1/estimates`)




// payload represents the form data to be present before making API requests
// all your post requests must have the Authorization Bearer API Token in it
// It must also contain the Content-Type header
// for more information on the docs, visit https://docs.carboninterface.com/

export const postSandbox = async function() {
    const API_KEY = envJSON.API_KEY;
    const estimateId = `9b1e2132-6216-4c64-84b2-23cf31eb472d`
    const url = new URL(`https://www.carboninterface.com/api/v1/estimates`)
    const payload = {
        "type": "fuel_combustion",
        "fuel_source_type": "dfo",
        "fuel_source_unit": "btu",
        "fuel_source_value": 3
    }

    try { 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY} `
            },
            
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        console.log('RESPONSE IN postSanbox --->', data)
        return data
    } catch (err) {
        console.warn(err)
    }
}



// for more information on the docs, visit https://docs.carboninterface.com/#/?id=electricity

export const electricEstimate = async function() {
    const payload = {
        "type": "electricity",
        "electricity_value" : 500,
        "country" : "gb"
    }

    try { 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            
            body: JSON.stringify(payload)
        })

        const data = await response.json();

        console.log('ELECTRIC ESTIMATE RESPONSE')
        console.log('----------------------------')
        console.log(data)
        
        return data
    } catch (err) {
        console.warn('err below')
        console.warn(err)
    }
}


const headers = new Headers()

headers.append("Content-Type", "application/json")
headers.append("Authorization", `Bearer ${API_KEY}`)


// for more information on the docs, visit https://docs.carboninterface.com/#/?id=shipping
// units: mi, lb
// user will provide: weight_value, distance_value, transport_method

export const shippingEstimate = async function () {
    const payload = {
        type: "shipping",
        // tonnes, kg and lb are also accepted
        weight_unit: "lb",
        weight_value: 30,
        // miles or kilometers
        distance_unit: "mi",
        distance_value: 2000,
        transport_method: "truck"
    }

    try {

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
    
        const data = await response.json()
        console.log('RESPONSE DATA BELOW')
        console.log('--------------------')
        console.log(data)
    
        return data
    

     } catch (err) {
        console.log('err below')
        console.log(err)
        return err
    }


}


// im not certain about how this endpoit is supposed to work??
// it returns resource not found
export const vehicleMakes = async function() {
    console.log(`${url}/vehicle_makes <-------`)
    
    try { 
        const response = await fetch(`${url}/vehicle_makes`, {
            method: "GET",
            headers: headers,
        })

        const data = await response.json()
        console.log(response.status)
        console.log('data below')
        console.log('-----------')
        console.log(data);

        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

await vehicleMakes()


