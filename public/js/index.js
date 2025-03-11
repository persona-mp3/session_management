const form = document.querySelector('form');
const loginForm = document.querySelector('.login-form');
const alertFeedback = document.querySelector('.alert')
const errorMessage = document.querySelector('.err')

// errorMessage.innerText = `       `

async function sendData(form) {
    try {
        const formData = new FormData (form);
        const userData = {}

        // formData.entres() return an iteratble of string key values
        // append the key values to the empty object
        for (let  [pro, value] of  formData.entries()) {

            if (value === '') {
                console.log('Empty field found')
                return;
            }
            userData[`${pro}`] = value

        }
        
        console.log('---> data object', userData)
        console.log(JSON.stringify(userData))


        const response = await fetch('/register/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        })



        // const response = await fet
    } catch (err) {
        console.log(err)
    }
}



async function logInRequest(loginForm) {
    try { 
        const formData  = new FormData(loginForm);
        const loginData = {}

        for (let [credential, value] of formData.entries()) {
            loginData[`${credential}`] = value
            console.log(`${credential}: ${value}`)
        }

        const response  = await fetch('/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        })
        
        const data = await response.json()

        if (response.status === 401){
            let responseMessage = data.problem
            errorMessage.innerText = `${responseMessage}`
            return;

        }
        console.log("response from server ---->", data)
        return data

        
    } catch(err) {
        console.warn(err)
    }
}


// form.addEventListener('submit', async (evt) => {
//     evt.preventDefault()
//     console.log('rrr')
//     const data = await sendData(form)
// })


loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault()

    const data = await logInRequest(loginForm)
    if (data === undefined) {
        // invalid credentials
        return;
    }

    alertFeedback.classList.add('active-alert');
    setTimeout(()=> {
        alertFeedback.classList.remove('active-alert')
    }, 5000)
})