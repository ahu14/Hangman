let listWords = [
  {'word' : 'apple', 'clue' : 'common fruit'},
  {'word' : 'chicken', 'clue' : 'white meat'},
  {'word' : 'popsicle', 'clue' : 'so refreshing on a hot day'},
  {'word' : 'lemon', 'clue' : 'taste sour'},
  {'word' : 'water', 'clue' : 'something you drink everyday'},
  {'word' : 'umbrella', 'clue' : 'suddenly vanishing when it\'s on rainy day'},
  {'word' : 'laptop', 'clue' : 'you play this game at ...'},
  {'word' : 'soda', 'clue' : 'you get diabetes when you drink it too much'},
  {'word' : 'banana', 'clue' : 'the yellow one'},
  {'word' : 'bottle', 'clue' : 'to keep your water in a place'},
  {'word' : 'shampoo', 'clue' : 'make your hair clean'},
];

let player = {
  life : 10,
  imageNumber : 0
}

let image = document.querySelector('.image');
image.src = './Assets/hangman/' + player.imageNumber + '.jpg';


function getRandomWord(listWords){
  let randomIndex = Math.floor(Math.random() * listWords.length);
  let getWord = listWords[randomIndex];

  let seperatedWord = [];
  let blankWord = [];

  let clue = document.querySelector('#clue');
  clue.innerHTML = getWord.clue;

  for (let i in getWord.word){
    seperatedWord.push(getWord.word[i]);
    blankWord.push('_');
  }

  return {
    'seperated-word' : seperatedWord,
    'blank-word' : blankWord
  };
}


let wordRandom = getRandomWord(listWords);

let word = document.querySelector('#word');
word.innerHTML = wordRandom['blank-word'];

let keyboard_btn = document.querySelectorAll('.keyboard-btn');
let usedWord = [];


function detectMouseClick(event){
  let classValue = event.target.getAttribute('class');
  let clickedValue = event.target.innerText.toLowerCase();

  if (classValue === 'keyboard-btn' && !usedWord.includes(clickedValue)){
    if (player.life !== 0){
      if (wordRandom['seperated-word'].includes(clickedValue)){
        for (let i in wordRandom['seperated-word']){
          if (wordRandom['seperated-word'][i] == clickedValue){
            wordRandom['blank-word'][i] = clickedValue;
            word.innerHTML = wordRandom['blank-word'];

            usedWord.push(clickedValue);
            event.target.style.background = "#ff0000";
            event.target.pointerEvents = 'none';
          }
        }
        
        if (!wordRandom['blank-word'].includes('_')){
          word.innerHTML = 'right !';

          setTimeout(() => {
            for (let i = 0; i < keyboard_btn.length; i++){
              keyboard_btn[i].style.display = "grid";
              keyboard_btn[i].style.background = "#fff";
            }

            usedWord = [];
            wordRandom = getRandomWord(listWords);

            player.life = 10;
            player.imageNumber = 0;
            image.src = './Assets/hangman/' + player.imageNumber + '.jpg';

            word.innerHTML = wordRandom['blank-word'];
          }, 1000);
        }
      }
      
      else{
        player.life -= 1;
        player.imageNumber += 1;
        image.src = './Assets/hangman/' + player.imageNumber + '.jpg';

        usedWord.push(clickedValue);
        event.target.style.background = "#ff0000";
        event.target.pointerEvents = 'none';
      }
    }
    
    else{
      let question = `Wanna play again ?\nPress OK to play again`;

      if (confirm(question) == true){
        window.location.reload();
      }

      else{
        window.location.replace('https://google.com');
      }
    }
  }
}