const questionData = quizApi;
console.log(questionData);
// initializing utility functions
function getRandomElement(array){
const i = Math.floor(Math.random() * array.length);
return array[i]
}

function shuffleArray(array){
return array.sort((a,b) => Math.random() - 0.5)
}

//other functions
function enable(btn){
btn.setAttribute("disabled","")
}
function disable(btn){
btn.removeAttribute("disabled")
}

function getMutlipleChoices(n,correctAnswer,possibleAnswers){
const choiceQst = [];
choiceQst.push(correctAnswer);
while(choiceQst.length < n){
let randomChoice = getRandomElement(possibleAnswers)
//check if it is existing in the array
if(!choiceQst.includes(randomChoice)){
choiceQst.push(randomChoice)
}
}

return shuffleArray(choiceQst)
}

// declaring necessary variables
const nextBtn = document.getElementById("next-btn");
const optionEl = document.querySelector(".options");
console.log(optionEl)

// when the next Button is clicked
nextBtn.addEventListener("click",nextQst)
let quiz;
let completedGuess = 0;
let correctGuess = 0;
// getting the nex question

function nextQst(){
quiz = questionData.shift();


// console.log(optionEl.children.length)
removeANodeList(optionEl.children);
// document.querySelector(".question-header").textContent = quiz.question;
console.log(quiz);
getRadioElements(quiz.correctAnswer)
createOptionField()

enable(nextBtn)
}

async function getRadioElements(correctAnswer){
const qstnContainer = await document.getElementsByClassName("question-container");	
for(let qstn of qstnContainer){

qstn.addEventListener("click",(e)=>{

// const qstnContainer = document.querySelectorAll(".question-container")
// console.log(qstnContainer)
// for(qstn of qstnContainer){
// if(e.target.id === qstnContainer.id){
// qstn.classList.add("active-container")
// }
// }
const activeClass =  document.querySelector(".active-container");
qstn.classList.add("active-container");
console.log(e.target)
if(activeClass){
activeClass.classList.remove("active-container")
}




if(e.target.nodeName !== 'INPUT'){
return;
}

const radioBtn = document.querySelectorAll(".radio");
for(let qstBtn of radioBtn){
enable(qstBtn)
}

if(questionData.length > 0){
disable(nextBtn);
}
else{
nextBtn.innerText = 'no more questions';
}
if(e.target.value === correctAnswer){
//increment the score
correctGuess ++;
}
completedGuess++;

})
}

document.getElementById("current-guess").innerText = correctGuess;
document.getElementById("completed").innerText  = completedGuess;
}



// create multichoice questions options
function createOptionField(){
 let wrapperDiv;
 let sectionEl = document.createElement("section");
 let heaaderDiv = document.createElement("div");
 heaaderDiv.textContent = `${quiz.question}`;
 heaaderDiv.className = 'question-header';
 sectionEl.appendChild(heaaderDiv)

 for(let optionField of getMutlipleChoices(3,quiz.correctAnswer,quiz.possibleAnswers)){
 console.log(optionField)
 wrapperDiv = `
 <div class="question-container" id="${optionField}">
 <input class="radio" type='radio' id="${optionField}" value ="${optionField}" name="${quiz.name}"/>
 <label class='label-class' for="${optionField}"> ${optionField} </label>
 </div>
 `
 sectionEl.insertAdjacentHTML("beforeend",wrapperDiv)
}
return optionEl.appendChild(sectionEl);
}

//remove a node after the next button has been fired
function removeANodeList(nodelist){
if(nodelist.length > 0){
optionEl.removeChild(nodelist[0])
}
}

nextQst();