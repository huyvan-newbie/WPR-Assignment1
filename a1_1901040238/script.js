/* To Screen2 */
const Main = document.querySelector('#main');
const startTheHTMLQuizIntro = document.querySelector('#introduction');
const startTheHTMLQuiz = document.querySelector('.startButton');
const attemptQuizz = document.querySelector('#attempt-quiz');
const linkAPI = 'https://wpr-quiz-api.herokuapp.com/attempts';

const submitYourAnswer = document.querySelector('.submitYourAnswerText');
const reviewQuizz = document.querySelector('#review-quiz');

const questionSubmit = {};

function clickToStart() {
    startTheHTMLQuizIntro.classList.add('hidden');
    attemptQuizz.classList.remove('hidden');
    Main.scrollIntoView();
}

/* Call API */

let questionID = {
    _id: "",
    _v: 0,
    text: "",
    answer: [],
}

let questionInfo = {
    _id: "",
    __v: 0,
    startAt: "",
    questions: [],
    complete: false,
    score: 0,
}

fetch(linkAPI, {
    method: 'POST',
    body: JSON.stringify(questionInfo),
    header: { 'Content-type': 'application/json; charset=UTF-8' },
})
    .then(res => res.json())
    .then(loadQuestion => {


        questionInfo = loadQuestion;

        let questions = questionInfo.questions

        for (let i = 0; i < 10; i++) {
            const question = questions[i]

            const questionText = document.getElementById("questionNo" + (i + 1))
            questionText.innerText = question.text

            for (let j = 0; j < question.answers.length; j++) {
                const quizOptions = document.getElementById("option" + (i + 1) + "_" + (j + 1))
                quizOptions.lastChild.nodeValue = question.answers[j]
                // console.log(question.answers[j])
            }

            if (question.answers.length < 4) {
                for (let k = question.answers.length + 1; k <= 4; k++) {
                    const answerDiv = document.getElementById("option" + (i + 1) + "_" + k)
                    const parentAnswerDiv = answerDiv.parentElement;
                    parentAnswerDiv.style.display = "none";
                }
            }
        }
    });

startTheHTMLQuiz.addEventListener('click', clickToStart)

/* To Screen3 */

function createReviewScreen(questionInfo) {
    const taisaolaintn = questionInfo.questions;

    var ele = '<form id="question-list">';

    taisaolaintn.forEach((question, i) => {
        ele += '<h1 id="question-counter">Question ' + (i + 1) + ' of ' + taisaolaintn.length + '</h1>'
        ele += '<h4 id="questionNo' + (i + 1) + '">' + htmlEntities(question.text) + '</h4>'
        ele += '<div>'
        if (question.answers) {
            question.answers.forEach((answer, j) => {
                ele += '<div class="optionNo">'
                ele += '<input type="radio" id="option' + i + '=' + j + '" name="answer' + (i + 1) +'" value="option' + (j + 1) + '">'
                ele += '<label for="option' + (i + 1) + (j + 1) + '" id="' + question._id  + j + '">' + htmlEntities(answer) + '</label><br>'
                ele += '</div>'
            })
        }
        ele += '</div>'
    })
    ele += '</form>'
    
    ele += '<div id="try-again-button">'
    ele += '<h1>Result:</h1>'
    ele += '<div class="rightAnswerNum">1/10</div>'
    ele += '<div class="rightPercentage">10%</div>'
    ele += '<div class="commentText">Practice more to improve it :D</div>'
    ele += '<button class="tryAgainText">Try again</button>'
    ele += '</div>'
    

    const formIdQuestionList = document.querySelector('#review-quiz form');
    formIdQuestionList.innerHTML = ele;
    console.log(formIdQuestionList);

    const radios = document.querySelectorAll('input[type="radio"]');
        for (let radio of radios) {
            radio.setAttribute('disabled', true);
        }

    for (let i = 0; i < 10; i++) {

        var elementQuestion = document.getElementsByName('answer' + (i + 1));
        var questionsReviewing = questionInfo.questions;
        var optionSelection = questionsReviewing[i];
        var questionIdentifier = optionSelection._id;

        for (let j = 0; j < elementQuestion.length; j++) {
            if (elementQuestion[j].checked) {
                questionSubmit[questionIdentifier] = String(j);
                console.log(elementQuestion[j]);
                
                
            }
        }
    }
    const correctAnswers = questionInfo.correctAnswers;
    console.log(correctAnswers)
    console.log(questionSubmit)

    compareAnswerToRivew(correctAnswers)
}

function compareAnswerToRivew(dataCompare){
    var i = 0;
    var numberQuestionCorrect = 0;
    var numberQuestion = Object.keys(dataCompare).length;

    for (let QuestionId in dataCompare) {
        if (questionSubmit[QuestionId]) {
          
            if (questionSubmit[QuestionId] === dataCompare[QuestionId]) {
                document.getElementById(QuestionId + dataSubmit[QuestionId]).classList.add('rightAnswer');
                numberQuestionCorrect++;
            } else {
                document.getElementById(QuestionId + questionSubmit[QuestionId]).classList.add('wrongAnswer')
                document.getElementById(QuestionId + dataCompare[QuestionId]).classList.add('notSelected') 
            }
            
        } else {
            document.getElementById(QuestionId + dataToCompare[QuestionId]).classList.add('notSelected')
            // i++;
        }
        
    }

}


function submitSubmit() {

    fetch(linkAPI + '/' + questionInfo._id + '/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionSubmit)
    }).then(res => {
        return res.json();
    }).then(createReviewScreen);
}


function clickToSubmit() {
    attemptQuizz.classList.add('hidden');
    reviewQuizz.classList.remove('hidden');
    Main.scrollIntoView();
    submitSubmit();
}



submitYourAnswer.addEventListener('click', clickToSubmit);

/* Try Again */

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

// tryAgain.addEventListener('click', clickToTryAgain);

function htmlEntities(s) {
    return s.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}