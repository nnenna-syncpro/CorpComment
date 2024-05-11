const textareaEl = document.querySelector('.textarea__textarea');
const charactersLeftEl = document.querySelector('.textarea__textarea--characters');

function charactersLeft(){
    //get current number of characters typed in textarea
    const numberOfCharacters = textareaEl.value.length;

    //get and set number of characters left
    const charactersLeft = 150 - numberOfCharacters;
    charactersLeftEl.textContent = charactersLeft;

    //set conditions when characters are maxed out
    if(charactersLeft<0){
        charactersLeftEl.textContent = 0;
    }
}

textareaEl.addEventListener('input', charactersLeft);

//fetch company feedback data from api
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(response => {return response.json()})
.then(data => console.log(data))
.catch(function(error){console.log("Error: " + error)});