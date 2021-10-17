/* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */
const Main = document.querySelector('#main');
const startTheHTMLQuizIntro = document.querySelector('#introduction');
const startTheHTMLQuiz = document.querySelector('.startButton');
const attemptQuizz = document.querySelector('#attempt-quiz');

function clickToStart() {
    startTheHTMLQuizIntro.classList.add('hidden');
    attemptQuizz.classList.remove('hidden');
    Main.scrollIntoView();
}

startTheHTMLQuiz.addEventListener('click', clickToStart)

/* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */

fetch ('https://wpr-quiz-api.herokuapp.com/?fbclid=IwAR3uFweTK7SvZmU9Di6Xrb9uKpk2maXoZp264Q0Y7YZIuEgrQjNU7lqk6Ig', {
    method: 'POST',
    body: JSON.stringify(question),
    header: {'Content-type': 'application/json; charset=UTF-8'},
})
    .then(res => res.json())
    .then(loadQuestion => {

        question = loadQuestion;
        console.log('Check this out', loadQuestion)
        console.log()

    });

/* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    /* To Screen3 */    

const submitYourAnswer = document.querySelector('.submitYourAnswerText');
const reviewQuizz = document.querySelector('#review-quiz');

function clickToSubmit() {
    attemptQuizz.classList.add('hidden');
    reviewQuizz.classList.remove('hidden');
    Main.scrollIntoView();
}

submitYourAnswer.addEventListener('click', clickToSubmit);

/* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */ /* Try Again */

const tryAgain = document.querySelector('.tryAgainText')

function clickToTryAgain() {
    reviewQuizz.classList.add('hidden');
    startTheHTMLQuizIntro.classList.remove('hidden');
    Main.scrollIntoView();


    //clear selected option
    let clearSelected = attemptQuizz.querySelectorAll('input');
    for (var i = 0; i < clearSelected.length; i++) {
        if (clearSelected[i].checked) {
            clearSelected[i].checked = false;
        }
    }
}

tryAgain.addEventListener('click', clickToTryAgain);

