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

//fetch and display company feedback data from api
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(response => {return response.json();})
.then(data => {
    data.feedbacks.forEach(company => {
        const htmlMarkup = `<li class="feedback__item">${company.upvoteCount} ${company.badgeLetter} ${company.company} ${company.text} ${company.daysAgo} </li>`;
        document.querySelector('.feedbacks').insertAdjacentHTML('afterend', htmlMarkup);
    });
})
.catch(function(error){console.log("Error: " + error)});

//fetch company feedback data from api and display on console
// fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
// .then(response => {return response.json()})
// .then(data => console.log(data))
// .catch(function(error){console.log("Error: " + error)});