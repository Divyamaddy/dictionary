let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = '4590f022-0ad9-49c1-ae9a-7633716552e1';
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading'); 

searchBtn.addEventListener('click',function(e){
    e.preventDefault();

    // clear data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';


    //get input data
    let word = input.value;

    //check the input
    if(word === '') {   //input is blank
       alert("Word is required");
        return;  
    }
    //if input has some value then call api
    //call api and get data
    getData(word);
})

async function getData(word){

    loading.style.display = 'block';

  const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

  const data = await response.json();

  //if result is empty
  if(!data.length)  {       //does not have length
    loading.style.display = 'none';
    notFound.innerText = 'No result found';
        return;
  } 

  //if result is suggestions
  if(typeof data[0] === 'string'){       //it is in form of (string)array
    loading.style.display = 'none';
      let heading = document.createElement('h3');
      heading.innerText = 'Did you mean?';
      notFound.appendChild(heading);
      data.forEach(element => {
         let suggestion = document.createElement('span');         //adding span
         suggestion.classList.add('suggested');       //adding a class
         suggestion.innerText = element;
         notFound.appendChild(suggestion)
      });
      return;
}

//Result found
loading.style.display = 'none';
let defination = data[0].shortdef[0];
defBox.innerText = defination;

//for audio file( SOUND )
//0-hwi-prs-0-sound
const soundName = data[0].hwi.prs[0].sound.audio;
if(soundName){
    renderSound(soundName);

}
 console.log(data);
}

function renderSound(soundName){

    //     https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);

    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey} `;

    let aud = document.createElement('audio');

    aud.src = soundSrc;

    aud.controls = true;

    audioBox.appendChild(aud);

    
}

