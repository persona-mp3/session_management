const form = document.querySelector('form');
const loginForm = document.querySelector('.login-form');

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

        const repsonse  = await fetch('/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        })


        console.log("response from server ---->", response)

        
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
})