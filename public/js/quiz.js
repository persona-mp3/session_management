// import fs from 'fs'
const quiz = document.querySelector('.question');
const nextBtn = document.querySelector('.sec-btn');
const inputEls = document.querySelectorAll('.option')
import quizJson from './dynamic_form.json' assert {type: "json"};

const sendQuizJson = function(counter){

    if (counter === undefined) {
        counter = 0
    }

    console.log(counter, typeof counter)
    const questionArray = quizJson.Questions
    return questionArray[counter]
}

const renderUI =  function() {
    const currentState = sendQuizJson(2)
    console.log(currentState)
    let question = currentState.question;
    let options = currentState.options;

    quiz.innerText = question
    
}

renderUI()

// sendQuizJson()
nextBtn.addEventListener('click', () => {
    console.log('im in')
})