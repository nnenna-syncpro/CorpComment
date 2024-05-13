const textareaEl = document.querySelector('.textarea__textarea');
const charactersLeftEl = document.querySelector('.textarea__textarea--characters');
const companyListEl = document.querySelector('.company');

const listCompanyEl = document.querySelector('.company__name');
const hashtagName = document.querySelector('.company__name--hashtag');



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
        const htmlMarkup = `<tr class="feedback__row"><td class="feedback__row--upvote"><i class="fa-solid fa-caret-up"></i>${company.upvoteCount}</td><td class="feedback__row--badgeLetter"><span class="badge">${company.badgeLetter}</span></td>

        <td class="feedback__row--text"> <span class="feedback__row--textCompany">${company.company} </span>
        <span class="feedback__row--textFeedback"> ${company.text}
        </span></td>

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
    // const formData = new FormData(submitFormEl); //methods = get, set, delete, append data from form
    // const data = Object.fromEntries(formData);

    //PROBLEM WAS TRYING TO USE FORMDATA INSTEAD OF TEXTAREA VALUE
    console.log(textareaEl.value);

    //object to return to API
    const feedbackInput = {
        company: "Test",
        badgeLetter: "T",
        upvoteCount: 0,
        daysAgo: 0,
        text: "Testing POST"
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
function onclickHandler(company){
    
}

companyListEl.addEventListener('click', function(event){
    console.log(event.target); //returned button tag == same output as console.log(hashtagName)
    // console.log(event.target.value);
    

    // //get the name of company
    // const clickedCompany = event.target;
    // const companyName = companyListEl.textContent;
    // console.log(companyName); //returned all company names

    // const clickedCompanyName = listCompanyEl.textContent;
    // console.log(clickedCompanyName); //returned ByteGrad

    // const name = clickedCompany.textContent;
    // console.log(typeof clickedCompany ); //object

    // //use name of company to filter data
    // console.log(hashtagName); //returned button tag of first element
    // console.log(typeof hashtagName); //object
    // console.log(hashtagName.textContent);

    //display filtered result

});

//display data list in descending order of upvote
//the fetched data is already sorted. Check CSS to display it in reverse column