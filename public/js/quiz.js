// import fs from 'fs'
const quizHeader = document.querySelector('.question');
const nextBtn = document.querySelector('.sec-btn');
const inputEls = document.querySelectorAll('.option')
const formControl = document.querySelector('.form-control')
const options = document.querySelectorAll('.option')

// import { CursorTimeoutMode } from 'mongodb';
import quizJson from './dynamic_form.json' assert {type: "json"};

const sendQuizJson = function(counter, i){

    if (counter === undefined) {
        counter = 0 + i
    }

    // console.log(counter, typeof counter)
    const questionArray = quizJson.Questions
    if (counter === questionArray.length) {
        console.log('all questions answered -->', counter)
        return;
    }
    // console.log(questionArray)
    return questionArray[counter]
}


const renderUI =  function(counter) {
    const currentState = sendQuizJson(counter)
    // console.log(currentState)

    if (currentState === undefined) {
        console.log('all questions finished');
        return;
    }
    let question = currentState.question;
    let options = currentState.options;    
}



function dynamics2(counter) {
    const questionArray = quizJson.Questions;

    if (counter === undefined) {
        counter = 0
    }

    if (counter === questionArray.length) {
        console.log('all questions answered')
        return 0;
    }

    const currentQuestion = questionArray[counter]

    let contextQuestion = currentQuestion.question
    let contextOptions = currentQuestion.options

    // dom rendering
    quizHeader.innerText = contextQuestion;

    for (let key of Object.keys(options)) {
        // get the values from the object
        const currVals = options[key]
        if (currVals.value !== undefined) {
            currVals.value = contextOptions[key]
        }

        currVals.innerText = contextOptions[key]

    }
}


let i = 0
nextBtn.addEventListener('click', (evt) => {
    console.log(i)
    const isDone = dynamics2(i)
    if (isDone === 0) {
        return;
    }
    i++;
    console.log('i++', i)
})