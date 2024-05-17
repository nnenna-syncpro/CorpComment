const textareaEl = document.querySelector('.textarea__textarea');
const charactersLeftEl = document.querySelector('.textarea__textarea--characters');
let maxCharacters = 150;
const companyListEl = document.querySelector('.company');
const maxCharactersEl = document.querySelector('.textarea__textarea--characters');
const feedbackRowsEl = document.querySelector('.feedback__row');
const feedbackTableEl = document.querySelector('.feedback__table');
const upvoteEl = document.querySelector('.feedback__row--upvote');
const submitFormEl = document.querySelector('#submitForm');
const companyListItemEl = document.querySelector('.fa-caret-up');

let feedbackList = {};

const renderFeedbackHtmlMarkup = (company) => {
    const htmlMarkup = `<tr class="feedback__row"><td       class="feedback__row--upvote"><i class="fa-solid    fa-caret-up"></i>${company.upvoteCount}</td>
    <td class="feedback__row--badgeLetter"><span class="badge">${company.badgeLetter}</span></td>

    <td class="feedback__row--text"> <span class="feedback__row--textCompany">${company.company} </span>
    <span class="feedback__row--textFeedback"> ${company.text}</span></td>

    <td class="feedback__row--daysAgo">${company.daysAgo}d</td></tr>`;
    feedbackRowsEl.insertAdjacentHTML('afterend', htmlMarkup);
}

function charactersLeft(){
    //get current number of characters typed in textarea
    const numberOfCharactersTyped = textareaEl.value.length;

    //get and set number of characters left
    const charactersLeft = maxCharacters - numberOfCharactersTyped;
    charactersLeftEl.textContent = charactersLeft;

    //set conditions when characters are maxed out
    if(charactersLeft<0){
        charactersLeftEl.textContent = 0;
    }

}

textareaEl.addEventListener('input', charactersLeft);


//fetch and display company feedback data using a table
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(response => {return response.json();})
.then(data => {
    feedbackList = data.feedbacks.forEach(company => {
        renderFeedbackHtmlMarkup(company);
    });
})
.catch(function(error){console.log("Error: " + error)});
console.log(feedbackList);


//make fetch async
// const getFeedbacks = async () => {
//     try{
//         const response = await fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks');
//         const data = await response.json();
//         return data
        
//     } catch(error){
//         console.log("Error: " + error)
//     }
// }

// const displayFeedbacks = async () => {
//     const data = await getFeedbacks();

//     let feedbackDisplay = data.feedbacks.forEach((company) => {
//         const htmlMarkup = `<tr class="feedback__row"><td class="feedback__row--upvote"><i class="fa-solid fa-caret-up"></i>${company.upvoteCount}</td>
//         <td class="feedback__row--badgeLetter"><span class="badge">${company.badgeLetter}</span></td>

//         <td class="feedback__row--text"> <span class="feedback__row--textCompany">${company.company} </span>
//         <span class="feedback__row--textFeedback"> ${company.text}</span></td>

//         <td class="feedback__row--daysAgo">${company.daysAgo}d</td></tr>`;
//         feedbackRowsEl.insertAdjacentHTML('afterend', htmlMarkup);
//     })
// }

// displayFeedbacks();

//fetch and display company feedback data from api using bullet list
// fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
// .then(response => {return response.json();})
// .then(data => {
//     data.feedbacks.forEach(company => {
//         const htmlMarkup = `<li class="feedback__item">${company.upvoteCount} ${company.badgeLetter} ${company.company} ${company.text} ${company.daysAgo} </li>`;
//         document.querySelector('.feedbacks').insertAdjacentHTML('afterend', htmlMarkup);
//     });
// })
// .catch(function(error){console.log("Error: " + error)});

//fetch company feedback data from api and display on console
// fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
// .then(response => {return response.json()})
// .then(data => console.log(data))
// .catch(function(error){console.log("Error: " + error)});


//validate input and handle form submission
async function sendFormData(){
    //extract data for feedback object from textarea input
    const feedbackText = textareaEl.value;

    event.preventDefault(); //why this? to take over and prevent the browser's built-in form submission

    // when submit is clicked check if # was used in input
    if(feedbackText != "" && feedbackText.includes('#')){
        //if conditions are met submit form 
        //sendFormData();

        //highlight textarea border green for success
        textareaEl.classList.add('textarea__textarea--success');
   
        //remove green border
        setTimeout(function(){
            textareaEl.classList.remove('textarea__textarea--success'); 
        }, 2000);
        
        //clear textarea
        textareaEl.value = "";

        //reset counter
        maxCharactersEl.textContent = maxCharacters;
        
    }else{
        //if conditions are not met highlight textarea red for fail
        console.log("Error! Could not submit form");
        
        textareaEl.classList.add('textarea__textarea--fail');

        //remove red border
        setTimeout(function(){
            textareaEl.classList.remove('textarea__textarea--fail'); 
        }, 2000);
    }

    //Use split(" ") to separate company name from text and use substring(1) to return company name without # at index 0
    const companyName = feedbackText.split(" ").filter((company) => company.startsWith("#")).toString().substring(1);

    const firstLetterOfCompanyName = companyName.at(0).toUpperCase();

    const upvoteCount = 0;
    const daysAgo = 0;

    //object to return to API
    const feedbackInput = {
        company: companyName,
        badgeLetter: firstLetterOfCompanyName,
        upvoteCount: upvoteCount,
        daysAgo: daysAgo,
        text: feedbackText
    }

    console.log(feedbackInput);

    try{
        const response = await fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks',{
            method: "POST",
            //specify content type
            headers:{
                'Content-Type': 'application/json'
            },
            //set the FormData instance as the request body
            body: JSON.stringify(feedbackInput),
        });
        console.log(await response.json());
    } catch(error){
        console.log("Error: " + error)
    }

    //Append and display submitted data (feedbackInput) on DOM 
    renderFeedbackHtmlMarkup(feedbackInput);
   
}

submitFormEl.addEventListener('submit', sendFormData)

// upvoteEl.addEventListener('click', function(event){
//     console.log("hello");
// })
//when hashtag buttons are clicked filter data from API to display only those items
//on hover effect for #buttons

function onclickHandler(company){
    
}

// companyListItemEl.addEventListener('click', function (event){
//     console.log(event.target.textContent);
//     //get the name of company clicked to filter results by
//     const clickedHashtag = event.target.textContent.trim(); //only returns first item. Needs a loop
// })

companyListEl.addEventListener('click', function(event){
    //get the name of company clicked to filter results by
    if (event.target.className === "company") return;

    const clickedHashtag = event.target.textContent.trim().toLowerCase();
    console.log(clickedHashtag);

    // feedbackRowsEl.childNodes.forEach(childNode =>{
    //     //ignore text
    //     if(childNode.nodeType === 3) return;

    //     //get name from feedback row
            // error in childNode.querySelector
    //     const nameFromFeedback = childNode.querySelector('.feedback__row--textCompany').innerText.toLowerCase();

    //     //remove unmatched company name
    //     if(clickedHashtag !== nameFromFeedback){
    //         childNode.remove();
    //     }
    // })

    //iterate through feedback rows to extract cell data
    for (let row of feedbackTableEl.rows) 
    {
        for(let cell of row.cells) 
        {
        const cells = cell.innerText.toLowerCase();
       // console.log(cells);

        //filter cell data for company name
        const matchingName = cells.split(" ").filter((company) => company.includes(clickedHashtag)).toString();
        console.log(matchingName);

      
        
        //display filtered result
        if(clickedHashtag !== matchingName){
            //let row with matching name be visible and row without be hidden
            feedbackRowsEl.hidden = true;
            //row.hidden = true;
            row.cells.hidden = true;
        }
       
        }
    }

});

//display data list in descending order of upvote. The fetched data is already sorted. Check CSS to display it in reverse column