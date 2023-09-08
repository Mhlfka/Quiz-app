const questions = [
    {
        question: "Eng birinchi payg'ambarning ismlari",
        answers:[
            {text: "Muso (a.s)",  correct: false},
            {text: "Iso (a.s)",  correct: false},
            {text: "Odam (a.s)",  correct: true},
            {text: "Yusuf (a.s)",  correct: false},
        ]
    },
    {
        question: "5 vaqt namozdan keyingi end afzal namoz qaysi?",
        answers:[
            {text: "Shuroq",  correct: false},
            {text: "Zuho",  correct: false},
            {text: "Avvobiyn",  correct: false},
            {text: "Tahajjud",  correct: true},
        ]
    },
    {
        question: "Tun va Kun almashinuvida kimlar uchun alomatlar bor?",
        answers:[
            {text: "G'ayridinlar",  correct: false},
            {text: "Aql egalari",  correct: true},
            {text: "Musulmonlar",  correct: false},
            {text: "Payg'ambarlar",  correct: false},
        ]
    },
    {
        question: "Qur'on nechta suradan iborat?",
        answers:[
            {text: "114",  correct: true},
            {text: "120",  correct: false},
            {text: "30",  correct: false},
            {text: "75",  correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion(); 
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    }); 
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect =  selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";    
}
function showScore() {
    resetState();
    questionElement.innerHTML = `Siz ${questions.length} savoldan ${score} tasini topdingiz!`;
    nextButton.innerHTML = "Yana";
    nextButton.style.display = "block";

    if (score == 2) {
        alert("Yana ham kuproq urganing!")
    }else if (score == 3){
        alert("Yaxshi, lekin tuxtash kerak emas")
    }else if(score == 4){
        alert("Barakalla, ilm olishdan tuxtamang")
    }else if(score == 1){
        alert("Sizga birdan-bir maslahat: Kuproq urganing!")
    }else if(score == 0){
        alert("Sizga birdan-bir maslahat: Kuproq urganing!")
    }
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); 
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();


