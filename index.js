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
const allcheckBox =document.querySelectorAll("input[type=checkbox]");

const symbol = '~!@#$%^&*(){}[]<,>./?|\=+-_';


 let password ="";
 let passwordLength=10;
 let checkcount =0;
 handleSlider();
 // set strength color 

  function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText=passwordLength;
    
    // const newValue = passwordLength + 1;
    // inputSlider.value=newValue;

  }
  function setIndicator(color){
    indicator.style.backgroundColor= color;
  }

  function getRndInteger(min,max){
     return Math.floor(Math.random() * (max-min)) +min;
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

async function copyContent(){
try{
  await navigator.clipboard.writeText(passwordDisplay.value);
  copyMsg.innerText= "copied";
}
  catch(e){
    copyMsg.innerText="failed";

  }
copyMsg.classList.add("active"); 
setTimeout(()=>{
  copyMsg.classList.remove("active");
},2000);
  
}

function shufflePassword(array){
// fisher yates method 
  for (let i =array.length-1;i>0;i--){
    const j= Math.floor(Math.random()*(i+1));
    const temp =array[i];
    array[i]=array[j];
    array[j]=temp;
  }
  // let str = "";
  // array.forEach(el=>(str+=el));
  // return str;
  return array.join("");
}


function handleCheckBoxChange(){
   checkcount=0;
   allcheckBox.forEach((checkedbox)=>{
    if(checkedbox.checked)
      checkcount++;

   })
   if(passwordLength<checkcount){
    passwordLength=checkcount;
    handleSlider();
   }
}

allcheckBox.forEach( (checkbox)=>{
  checkbox.addEventListener('change',handleCheckBoxChange )
})

inputSlider.addEventListener('input',(event) =>{
  passwordLength=event.target.value;
  handleSlider();
})

copyBtn.addEventListener('click',(event)=>{
  if(passwordDisplay.value)
    copyContent();
})


generateBtn.addEventListener('click',()=>{
  // none of this checkbox slected no password generte

  if(checkcount==0)
     return;

  if(passwordLength < checkcount){
    passwordLength = checkcount;
    handleSlider();
  }
  console.log('starting jurney');
  // lets strt the jurny find new password
  password=" ";

  // lets put the stuff mentioned by checkbox

  // if(uppercaseCheck.checked){
  //   password+=generateUpperCase();

  // }
  //  if(lowercaseCheck.checked){
  //   password+=generateLowerCase();

  // }
  //  if(numbersCheck.checked){
  //   password+=generateRandomNumber();

  // }
  //  if(symbolsCheck.checked){
  //   password+=generateSymbol();

  // }

  let funArr=[];

  if(uppercaseCheck.checked)
    funArr.push(generateUpperCase);

  if(lowercaseCheck.checked)
    funArr.push(generateLowerCase);

  if(numbersCheck.checked)
    funArr.push(generateRandomNumber);

  if(symbolsCheck.checked)
    funArr.push(generateSymbol);

  // compulsory addition

  for(let i=0; i<funArr.length; i++){
    password +=funArr[i]();
  }
  console.log('compulsory adition ');

  // remaning
  for(let i=0; i<passwordLength-funArr.length; i++){
    let randIndex = getRndInteger(0, funArr.length);
    password +=funArr[randIndex]();
  }
console.log('ramaning jurney');
  // shuffle the password 
  password =shufflePassword(Array.from(password));

  console.log('shuffle jurney');

  // show in display
  passwordDisplay.value=password;
  console.log('ui jurney');

  //calculate the strenght
  calcStrength();

});
