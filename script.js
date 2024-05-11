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

//fetch and display company feedback data using a table
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
.then(response => {return response.json();})
.then(data => {
    data.feedbacks.forEach(company => {
        const htmlMarkup = `<tr class="feedback__row"><td class="feedback__row--upvote">${company.upvoteCount}</td><td class="feedback__row--badgeLetter">${company.badgeLetter}</td>
        <td class="feedback__row--text">${company.company} ${company.text}</td>
        <td class="feedback__row--daysAgo">${company.daysAgo}d</td></tr>`;
        document.querySelector('.feedback__row').insertAdjacentHTML('afterend', htmlMarkup);
    });
})
.catch(function(error){console.log("Error: " + error)});

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
const submitFormEl = document.querySelector('#submitForm');

async function sendFormData(){
    //associate the FormData object with the form element
    const formData = new FormData(submitFormEl); //can .get, set, delete, append data from form

    try{
        const response = await fetch('https://reqres.in/api/users',{
            method: "POST",
            //specify content type
            headers:{
                'Content-Type': 'application/json'
            },
            //set the FormData instance as the request body
            body: JSON.stringify(formData),
        });
        console.log(await response.json());
    } catch(error){
        console.log("Error: " + error)
    }
}


submitFormEl.addEventListener('submit', (event) => {
    event.preventDefault(); //why this? to take over and prevent the browser's built-in form submission
    const feedback = document.querySelector('#feedback');

    // when submit is clicked check if # was used in input
    if(feedback.value != "" && feedback.value.includes('#')){
        //if yes, highlight textarea border green for success and submit form 
        console.log(textareaEl.value);
        sendFormData();
        textareaEl.classList.add('textarea__textarea--success');
        //clear textarea and remove green border
        textareaEl.value = textareaEl.value.replace(textareaEl.value, "");
        setTimeout(function(){
            textareaEl.classList.remove('textarea__textarea--success'); 
        }, 2000);
    }else{
        //if no highlight red for fail
        console.log("error");
        textareaEl.classList.add('textarea__textarea--fail');
        setTimeout(function(){
            textareaEl.classList.remove('textarea__textarea--fail'); 
        }, 2000);
    }
})

// submitFormEl.addEventListener('submit', (event) =>{
//     event.preventDefault();

//     const formData = new FormData(submitFormEl);
//     const data = Object.fromEntries(formData);

//     fetch('https://reqres.in/api/users',{
//         method: "POST",
//         //specify content type
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         //set the FormData instance as the request body
//         body: JSON.stringify(data)
//     }).then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// })


//Append and display submitted data on DOM

//when hashtag buttons are clicked filter data from API to display only those items
//on hover effect for #buttons


//display data list in descending order of upvote