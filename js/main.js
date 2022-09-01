/*********************************************************
 *  Author: Muntaka Helali                               *
 *  Date: August 31st, 2022                              *
 *  Description: Sipmle webpage to showcase the ability  *
 *  to use JSON and AJAX to fetch animal data and display*
 *  it from another source.                              *
 * ******************************************************/ 


//Variables
let counter = 1;
let div = document.getElementById('animal-info');
let button = document.getElementById('btn');
let buttonR = document.getElementById('btnR');
let title = document.getElementById('titleHeader')

//Model  
const retrieveAnimalData = () =>{
    let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+counter+'.json');
    ourRequest.onload = () => 
    {
        if(ourRequest.status >= 200 && ourRequest.status < 400)
        {
            let ourData = JSON.parse(ourRequest.responseText);
            div.classList.add('fetchDataArea');
            div.style = 'position:relative;z-index: 2;';
            renderHTML(ourData);
        }
        else{
            if(confirm('There was a problem retrieving the information, Would you like to try again!'))
            {
                ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+counter+'.json');
                ourRequest.onload;
            }
        }

        ourRequest.onerror = () => {
            alert('Network Error!')
        };
    }
    ourRequest.send();
    counter++; 
    if(counter > 3){
        button.classList.add('hide');
        buttonRView();
    }
}


// Controller
button.onclick = () => {
    div.innerHTML ='';
    title.classList.add('hide');
    retrieveAnimalData();
};

const buttonRView = () => {
    buttonR.classList.remove('hide');
    buttonR.classList.add('reloadButton');
    buttonR.onclick = reloadButton;
}

const reloadButton = () => {
    window.location.reload();
}
// View
const renderHTML = (data) => {
    let htmlString = "";
    for(i =0; i< data.length; i++){
        let paragraph = document.createElement('p');
        htmlString = data[i].name + " is a " + data[i].species + " that likes to eat";
        if(data[i].foods.likes.length > 1){
            htmlString += ': ';
        }
        else{
            htmlString += ' ';
        }

        for(j =0; j < data[i].foods.likes.length; j++){
            htmlString += data[i].foods.likes[j];
            if(j+1 < data[i].foods.likes.length){
                htmlString += ', ';
            }
            else{
                htmlString += '.';
            }
        }

        htmlString += ' '+data[i].name + ' does not like to eat';
        if(data[i].foods.dislikes.length > 1){
            htmlString += ': ';
        }
        else{
            htmlString += ' ';
        }
        for(k =0; k < data[i].foods.dislikes.length; k++){
            htmlString += data[i].foods.dislikes[k];
            if(k+1 < data[i].foods.dislikes.length){
                htmlString += ', ';
            }
            else{
                htmlString += '.';
            }
        }

        paragraph.innerText = htmlString;
        paragraph.classList.add('paragraph'); 
        console.log(paragraph.innerText);
        div.appendChild(paragraph);
    }
}