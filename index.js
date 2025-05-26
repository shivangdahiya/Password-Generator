const inputSlider= document.querySelector("[data-lengthslider]");
const lengthDisplay =document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck =document.querySelector("#uppercase");
const lowercaseCheck =document.querySelector("#lowercase");
const numbersCheck =document.querySelector("#numbers");
const symbolsCheck =document.querySelector("#symbols");
const indicator =document.querySelector("[data-indicator]");
const generateBtn =document.querySelector(".generateBtn");
const allcheckBox =document.querySelectorAll("input [type=checkbox]");

const symbol = '~!@#$%^&*(){}[]<,>./?|\=+-_';


 let password ="";
 let passwordLength=10;
 let checkcount =1;
 handleSlider();
 // set strength color 

  function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText=passwordLength;
    
    const newValue = passwordLength + 1;
    inputSlider.value=newValue;

  }
  function setIndicator(color){
    indicator.style.backgroundColor= color;
  }

  function getRndInteger(min,max){
    Math.floor(Math.random()*(max-min)) +min;
  }

  function generateRandomNumber(){
     return getRndInteger(0,9);
  }
function generateLowerCase(){
  return String.fromCharCode( getRndInteger(97,123));
}

function generateUpperCase(){
  return String.fromCharCode( getRndInteger(65,90));
}

function generateSymbol(){

  const randNum =  getRndInteger(0,symbol.length);
  return symbol.charAt(randNum);


}

function calcStrength(){
  let hasUpper =false;
  let hasLower = false;
  let hasNum = false;
  let hasSym =false;
  if (uppercaseCheck.checked) hasUpper= true;
  if (uppercaseCheck.checked) hasLower= true;
  if (uppercaseCheck.checked) hasNum= true;
  if (uppercaseCheck.checked) hasSym= true;
  

  if ( hasUpper && hasLower && (hasNum||hasSym)&& passwordLength >=8){
    setIndicator("#0f0");

  } else if (
    (hasLower||hasUpper) &&
    (hasNum||hasSym)&& passwordLength>=6
  ){
    setIndicator("#ff0");
  }
  else{
    setIndicator("#f00");
  }
}

function copyContent(){
  
}
