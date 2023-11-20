const questions = [
    {question:"In HTML, which tag is used to create an unordered list?",
    answers:[
        {value: "<ol>", correct: false},
        {value: "<list>", correct: false},
        {value: "<ul>", correct: true},
        {value: "<li>", correct: false}
    ]
    },
    {question:"What is the correct way to apply an external CSS file to an HTML document?",
    answers:[
    {value: '<link rel="stylesheet" type="text/css" href="mystyle.css">', correct: true},
    {value: '<style src="mystyle.css">', correct: false},
    {value: '<css>mystyle.css</css>', correct: false},
    {value: '<style href="mystyle.css">', correct: false}
]
    },
    {question:"Which CSS property is used to change the text color of an element??",
    answers:[
        {value: "text-color", correct: false},
        {value: "color", correct: true},
        {value: "font-color", correct: false},
        {value: "text-style", correct: false}
    ]
    },
    {question:"In JavaScript, which function is used to select an HTML element by its ID?",
    answers:[
        {value: "getElementByName()", correct: false},
        {value: "querySelector()", correct: false},
        {value: "getElementById()", correct: true},
        {value: "selectById()", correct: false}
    ]
    },
    {question:'What is the correct JavaScript syntax to write an "if" statement?',
    answers:[
        {value: "if condition { // code block }", correct: false},
        {value: "if (condition) // code block", correct: false},
        {value: "if {condition} // code block", correct: false},
        {value: "if (condition) { // code block }", correct: true}
    ]
    },
    {question:"Which HTML tag is used to define a hyperlink??",
    answers:[
        {value: "<a>", correct: true},
        {value: "<link>", correct: false},
        {value: "<href>", correct: false},
        {value: "<hyper>", correct: false}
    ]
    },
    {question:"How do you comment in JavaScript?",
    answers:[
        {value: "/* This is a comment */", correct: false},
        {value: "// This is a comment", correct: true},
        {value: "<-- This is a comment -->", correct: false},
        {value: "# This is a comment", correct: false}
    ]
    }
]


// fetching start button
let startBtn = document.querySelector("#startBtn");
// fetching start page
let startPage = document.querySelector(".start-page");

// fetching main application page
let app = document.querySelector(".app");

// fetching score page
let scorePage = document.querySelector(".score-page");

// fetching score element
let scoreHeading = document.querySelector("#score")

let question = document.querySelector("#question");
let ansBtns = document.querySelectorAll(".btn");
let nextBtn = document.querySelector("#next-btn");
let submitBtn = document.querySelector("#submit");

// all global vars
let currQuestionIndex = 0;
let score = 0;
let correctAns = "";
let incorrectAns = 0;
let totQuestions = questions.length;
let scorePercent=0;

function startQuiz(){
   
    startPage.style.display="none";
    app.style.display="inline";
    showQuestion();
}
function showQuestion(){
    resetState();
question.innerHTML= questions[currQuestionIndex].question;
showOptions();
}
function showOptions(){
    ansBtns.forEach((ele,index)=>{
    ele.innerText = questions[currQuestionIndex].answers[index].value;

if(questions[currQuestionIndex].answers[index].correct){
correctAns = questions[currQuestionIndex].answers[index].value;
}
ele.addEventListener('click',handleClick);
    });
}
function handleClick(e){
    // if we clicked on correct answer then only show the correct one
    if(correctAns===e.target.innerText)
    {
// e.target.style.backgroundColor = "green";
e.target.classList.add("correct");
score++;
console.log(score);
    }
    // if we clicked on incorrect answer then show the correct one and the incorrect one on which we clicked
else
{
    incorrectAns++;
    ansBtns.forEach((element)=>{
        if(element.innerText === correctAns){
        console.log(correctAns + "is correct");
        // element.style.backgroundColor = "green";
        element.classList.add('correct');
        }
        // e.target.style.backgroundColr = "red";
        e.target.classList.add('incorrect');
        });
}
currQuestionIndex++;
// show questions only if they are left
if(currQuestionIndex<=totQuestions-1)
showNextBtn();
else
submit();
disableBtns();
};
function submit(){
    console.log("final score is : " + score);
    submitBtn.style.display = "inline";
    submitBtn.addEventListener('click',submitHandler);

}
function submitHandler(){
    startPage.style.display="none"
    app.style.display="none";
    scorePage.style.display="flex";
    scorePercent=(score/totQuestions)*100;
    scoreHeading.innerText="You scored : "+score+"/"+totQuestions+" with "+scorePercent.toFixed(2)+"% of marks";
    
}
function showNextBtn(){
    nextBtn.style.display = "inline";
        
        nextBtn.addEventListener('click',showQuestion);
}
function resetState(){
    // initially we are not able to see the next button because of this line
    nextBtn.style.display = "none";
    ansBtns.forEach((ele)=>{
ele.classList.remove("incorrect");
ele.classList.remove("correct");
enableBtns();
    });
}
function disableBtns(){
    ansBtns.forEach((ele)=>{
        ele.disabled = true;
    });
}
function enableBtns(){
    ansBtns.forEach((ele)=>{
        ele.disabled = false;
    });
}

startBtn.addEventListener('click',startQuiz);