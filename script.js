const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scoreCard=document.querySelector('.scoreCard')
const alert=document.querySelector('.alert');
const startBtn=document.querySelector('.startBtn');
const timer=document.querySelector('.timer');
const oo=document.querySelector('.oo');

const quiz = [
{
    question:"Q1.which html tag is used to cretae a hyperlink?",
    choices:["<html>","<br>","<a>","<legend>"],
    answer:"<a>"
},
{
    question:"Q2.what does <td> stands for?",
    choices:["Table database","Table data","Table directory","Table direct row"],
    answer:"Table data"
},
{
    question:"Q3.which font format is used in web pages?",
    choices:["EOT","WOFF 2.0","WOFF","SVG Fonts"],
    answer:"WOFF"
},
{
    question:"Q4.which of te following is the web application equivalent to querySelectorAll()?",
    choices:["#()","&()","!()","$()"],
    answer:"$()"
}];
let currentQuestionIndex=0;
let score=0;
let timeLeft=15;
let timerId=null;
//Arrow fn to show questions
const showQuestions=() =>{

const questioDnetails= quiz[currentQuestionIndex];
questionBox.textContent=questioDnetails.question;

choicesBox.textContent="";
for(let i=0;i<questioDnetails.choices.length;i++){
    const currentChoice=questioDnetails.choices[i];
    const choiceDiv=document.createElement('div');     //To create an div element
    choiceDiv.textContent=currentChoice;
    choiceDiv.classList.add('choice'); //adding a class
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener('click',()=>{
       if(choiceDiv.classList.contains('selected')){
        choiceDiv.classList.remove('selected');
       }
       else{
        choiceDiv.classList.add('selected');
       }
    });
}
if(currentQuestionIndex < quiz.length)
{
    startTimer();
}
};
const checkAnswer=()=>{
    const selectedChoice=document.querySelector('.choice.selected');
   if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
   
   displayAlert("Correct Answer!");
   score++;
   }
   else{
  
    displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
   }
   timeLeft=15;
   currentQuestionIndex++;
   if(currentQuestionIndex < quiz.length){
     showQuestions();
   }
   else{
    showScore();
    stopTimer();
    timer.style.display="none";
   }
}
const showScore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent=`You Scored ${score} out of ${quiz.length}`;
    displayAlert("You have completed the quiz");
    nextBtn.textContent="Play Again";
    nextBtn.addEventListener('click',()=>{
        currentQuestionIndex=0;
        showQuestions();
    nextBtn.textContent="Next";
    scoreCard.textContent="";
    })
}
const displayAlert = (msg)=>{ 
                 //function to show alert
                 alert.style.display="block";
                 alert.textContent=msg;
                 setTimeout(() => {
                    alert.style.display="none";
                 }, 2000);
}
const startTimer=() =>{ 
    clearInterval(timerId);
    timer.textContent=timeLeft;

    const countDown =()=>{
        timeLeft--;
        timer.textContent=timeLeft;
        if(timeLeft == 0){
            const confirmUser=confirm("Time Over!Do you want to play again");
            if(confirmUser){
                timeLeft=15;
                startQuiz();
            }
            else{
                oo.style.display="block";
                startBtn.style.display="block";
                container.style.display="none";
                return;
            }
        }
    }
               timerId=setInterval(countDown,1000);
}

const stopTimer=()=>{
    clearInterval(timerId);
}
const startQuiz=()=>{
    timeLeft=15;
    timer.style.display="flex";
    showQuestions();
}

startBtn.addEventListener('click',() =>{
          startBtn.style.display="none";
          oo.style.display="none";
          container.style.display="block";
        startQuiz();
});

nextBtn.addEventListener('click',()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent==="Next"){
        displayAlert("Kindly select answer");
        return;
       
    }
    timer.style.display="flex";
    checkAnswer();
    
});