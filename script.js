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
// fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
// .then(response => {return response.json();})
// .then(data => {
//     data.feedbacks.forEach(company => {
//         const htmlMarkup = `<li class="feedback__item">${company.upvoteCount} ${company.badgeLetter} ${company.company} ${company.text} ${company.daysAgo} </li>`;
//         document.querySelector('.feedbacks').insertAdjacentHTML('afterend', htmlMarkup);
//     });
// })
// .catch(function(error){console.log("Error: " + error)});

//fetch and display company feedback data using tables
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(response => {return response.json();})
.then(data => {
    data.feedbacks.forEach(company => {
        const htmlMarkup = ` <tr class="feedback__row"><td class="feedback__row--upvote">${company.upvoteCount}</td><td class="feedback__row--badgeLetter">${company.badgeLetter}</td>
        <td class="feedback__row--text">${company.company} ${company.text}</td>
        <td class="feedback__row--daysAgo">${company.daysAgo}</td></tr>`;
        document.querySelector('.feedback__row').insertAdjacentHTML('afterend', htmlMarkup);
    });
})
.catch(function(error){console.log("Error: " + error)});

//fetch company feedback data from api and display on console
// fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
// .then(response => {return response.json()})
// .then(data => console.log(data))
// .catch(function(error){console.log("Error: " + error)});

// when submit is clicked check if # was used in input
//if yes, highlight textarea border green for success and submit form, and display data on DOM
//if no highlight red for fail

//when hashtag buttons are clicked filter data from API to display only those items
//on hover effect for #buttons