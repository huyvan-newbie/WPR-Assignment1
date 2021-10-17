/* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */    /* To Screen2 */
const Main = document.querySelector('#main');
const startTheHTMLQuizIntro = document.querySelector('#introduction');
const startTheHTMLQuiz = document.querySelector('.startButton');
const attemptQuizz = document.querySelector('#attempt-quiz');
const linkAPI = 'https://wpr-quiz-api.herokuapp.com/attempts';

function clickToStart() {
    startTheHTMLQuizIntro.classList.add('hidden');
    attemptQuizz.classList.remove('hidden');
    Main.scrollIntoView();
}

startTheHTMLQuiz.addEventListener('click', clickToStart)

/* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */   /* API */

let questionID = {
    _id:"",
    _v: 0,    
    text:"",
    answer: [],
}   

let questionInfo = {
    _id: "",
    _v: 0,   
    startAt: "", 
    questions: [],
    complete: false,
    score: 0,
}

fetch (linkAPI, {
    method: 'POST',
    body: JSON.stringify(questionInfo),
    header: {'Content-type': 'application/json; charset=UTF-8'},
})
    .then(res => res.json())
    .then(loadQuestion => {

        questionInfo = loadQuestion;
        console.log('Check this out', loadQuestion);
        console.log();

        let questions = questionInfo.questions

        for (let i = 0; i < 10; i++) {
            const question = questions[i]

            const questionText = document.getElementById("questionNo" + (i + 1))
            questionText.innerText = question.text

            for (let j = 0; j < question.answers.length; j++) {
                const quizOptions = document.getElementById("optionNo" + (i + 1) + "_" + (j + 1))
                quizOptions.lastChild.nodeValue = question.answers[j]
                console.log(question.answers[j])
            }

            if (question.answers.length < 4) {
                for (let k = question.answers.length + 1; k <= 4; k++) {
                    const ansDiv = document.getElementById("optionNo" + (i + 1) + "_" + k)
                    ansDiv.style.display = "none";
                }
            }
        }

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

