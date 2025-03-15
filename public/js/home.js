const redirectBtn = document.getElementById('question-redirect');

redirectBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    location.href = '/quiz'
})