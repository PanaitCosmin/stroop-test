const startBtn = document.getElementById('start-btn')
const restartBtn = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById("question-container")
const answerButtonsElements = document.getElementById('answer-buttons')
const textColor = document.getElementById('color')
const score = document.getElementById('score')
const scoreDisplay = document.getElementById('score-container')
const scoreVal = document.getElementById('score-display')
const scoreFinal = document.getElementById('score-val')
const maxScore = document.getElementById('max-score')
const questionDisplay = document.getElementById('question')

let shuffleQuestions = undefined 
let currentQuestionIndex = undefined

const questions = [
    {
        text:'green',
        color:'#1F75FE', //blue
        answers: [
            {text:'red',correct:false},
            {text:'yellow',correct:false},
            {text:'blue',correct:true},
            {text:'green',correct:false},
        ]
    },
    {
        text:'blue',
        color:'#FFA500',//orange
        answers: [
            {text:'green',correct:false},
            {text:'orange',correct:true},
            {text:'blue',correct:false},
            {text:'brown',correct:false},
        ]
    },
    {
        text:'violet',
        color:'#FF66CC',//pink
        answers: [
            {text:'orange',correct:false},
            {text:'violet',correct:false},
            {text:'red',correct:false},
            {text:'pink',correct:true},
        ]
    },
    {
        text:'pink',
        color:'#F2003C',//red
        answers: [
            {text:'pink',correct:false},
            {text:'violet',correct:false},
            {text:'red',correct:true},
            {text:'yellow',correct:false},
        ]
    },
    {
        text:'orange',
        color:'#7B3F00',//brown
        answers: [
            {text:'red',correct:false},
            {text:'brown',correct:true},
            {text:'orange',correct:false},
            {text:'blue',correct:false},
        ]
    },
    {
        text:'turquoise',
        color:'#80FF00',//green
        answers: [
            {text:'blue',correct:false},
            {text:'yellow',correct:false},
            {text:'green',correct:true},
            {text:'turquoise',correct:false},
        ]
    },
    {
        text:'green',
        color:'#0FFFFF',//turquoise
        answers: [
            {text:'green',correct:false},
            {text:'yellow',correct:false},
            {text:'blue',correct:false},
            {text:'turquoise',correct:true},
        ]
    },
    {
        text:'red',
        color:'#BF00FF',//violet
        answers: [
            {text:'red',correct:false},
            {text:'violet',correct:true},
            {text:'blue',correct:false},
            {text:'gray',correct:false},
        ]
    },
    {
        text:'brown',
        color:'#FFEF00',//yellow
        answers: [
            {text:'orange',correct:false},
            {text:'brown',correct:false},
            {text:'yellow',correct:true},
            {text:'red',correct:false},
        ]
    },
    {
        text:'green',
        color:'#BF00FF',//violet
        answers: [
            {text:'red',correct:false},
            {text:'pink',correct:false},
            {text:'green',correct:false},
            {text:'violer',correct:true},
        ]
    },
]
maxScore.innerText = questions.length * 10

startBtn.addEventListener('click',startGame)
restartBtn.addEventListener('click',startGame)
function startGame() {
    score.innerText = '0'
    startBtn.classList.add('hide')
    restartBtn.classList.add('hide')
    questionDisplay.classList.remove('hide')
    answerButtonsElements.classList.remove('hide')
    textColor.classList.remove("hide")
    questionContainerElement.classList.remove('hide')
    scoreVal.classList.add('hide')
    scoreDisplay.classList.remove('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    nextQuestion()
}

function nextQuestion() {
    resetState()
    
    if(shuffleQuestions.length >= currentQuestionIndex + 1) {
        showQuestion(shuffleQuestions[currentQuestionIndex])
    } else {
        clearStatusClass(document.body)
        answerButtonsElements.classList.add('hide')
        scoreDisplay.classList.add('hide')
        questionDisplay.classList.add('hide')
        textColor.classList.add("hide")
        restartBtn.classList.remove('hide')
        scoreFinal.innerText = score.innerText
        scoreVal.classList.remove('hide')
    }
}

function showQuestion(question) {
    textColor.innerText = question.text
    textColor.style.color = question.color
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElements.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsElements.firstChild) {
        answerButtonsElements.removeChild(answerButtonsElements.firstChild)
    }
    document.body.classList.remove('correct')
    document.body.classList.remove('wrong')
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    disabledBtn(answerButtonsElements.children)
    setStatusClass(document.body,correct)
}


function setStatusClass(element,correct) {
    clearStatusClass(element)
    if(correct) {
        document.body.classList.add('correct')
    } else {
        document.body.classList.add('wrong')
    }
    setScore(correct)
    setTimeout(()=>{
        currentQuestionIndex++
        nextQuestion()
    },400)
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function setScore(correct) {
    if(correct) {
        score.innerText = +score.innerText + 10
    } else {
        if(+score.innerText > 0) {
            score.innerText = +score.innerText - 5
        }
    }
}

function disabledBtn(buttons) {
    arrBtn = Object.values(buttons)
    arrBtn.forEach(btn => {
        return btn.disabled = true
    })
}