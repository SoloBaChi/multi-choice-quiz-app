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
let fact;
let completedGuess = 0;
let correctGuess = 0;
// getting the nex question

function nextQst(){
fact = questionData.shift();

// document.querySelector(".question-header").textContent = fact.question;
console.log(fact);
// console.log(document.getElementById("question-frame").innerHTML)
// document.getElementById("question-frame").innerHTML = createOptionField();
// document.createElement("section").appendChild(createOptionField())
getRadioElements(fact.correctAnswer)
createOptionField()

enable(nextBtn)
}

async function getRadioElements(correctAnswer){
const radioBoxes = await document.getElementsByClassName("radio");	
for(let radio of radioBoxes){

radio.addEventListener("click",(e)=>{

if(questionData.length > 0){
disable(nextBtn);
}
else{
nextBtn.innerText = 'no more questions';
}
if(e.target.value === correctAnswer){
console.log("yes")
//increment the score
correctGuess ++;
}
completedGuess++;

})
}

document.getElementById("current-guess").innerText = correctGuess;
document.getElementById("completed").innerText  = completedGuess;
}



function createOptionField(){
 let wrapperDiv;
 let sectionEl = document.createElement("section");
 let heaaderDiv = document.createElement("div");
 heaaderDiv.textContent = `${fact.question}`;
 heaaderDiv.className = 'question-header';
 sectionEl.appendChild(heaaderDiv)

 for(let optionField of getMutlipleChoices(3,fact.correctAnswer,fact.possibleAnswers)){
 console.log(optionField)
 wrapperDiv = `
 <div class="question-container">
 <input class="radio" type='radio' id="${optionField}" value ="${optionField}" name="${fact.name}"/>
 <label class='label-class' for="${optionField}"> ${optionField} </label>
 </div>
 `
 sectionEl.insertAdjacentHTML("beforeend",wrapperDiv)
}
return optionEl.appendChild(sectionEl);
}


// const choice1 = getMutlipleChoices(3,questionData[0].correctAnswer,questionData[0].possibleAnswers);
// console.log(choice1)

nextQst();