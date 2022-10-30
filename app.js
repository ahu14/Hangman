let listWords = ['apple', 'chicken', 'cucumber', 'brocolli', 'banana'];

let player = {
  life : 10,
  imageNumber : 0,
  score : 0
}

let image = document.querySelector('.image');
image.src = './hangman/' + player.imageNumber + '.jpg';

let score = document.querySelector('#score');
score.innerHTML = player.score;


function getRandomWord(listWords){
  let randomIndex = Math.floor(Math.random() * listWords.length);
  let getWord = listWords[randomIndex];
  let seperatedWord = [];
  let blankWord = [];


  for (let i in getWord){
    seperatedWord.push(getWord[i]);
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


function detectMouseClick(event){
  let classValue = event.target.getAttribute('class');

  if (classValue === 'keyboard-btn'){
    if (player.life !== 0){
      let text = event.target.innerText.toLowerCase();

      if (wordRandom['seperated-word'].includes(text)){
        for (let i in wordRandom['seperated-word']){
          if (wordRandom['seperated-word'][i] == text){
            wordRandom['blank-word'][i] = text;
            word.innerHTML = wordRandom['blank-word'];            
            event.target.style.display = "none";

            player.score += 1;
            score.innerHTML = player.score;
          }
        }
        
        if (!wordRandom['blank-word'].includes('_')){
          word.innerHTML = 'you win !';

          setTimeout(() => {
            for (let i = 0; i < keyboard_btn.length; i++){
              keyboard_btn[i].style.display = "grid";
            }

            wordRandom = getRandomWord(listWords);

            player.life = 10;
            player.imageNumber = 0;
            image.src = './hangman/' + player.imageNumber + '.jpg';

            word.innerHTML = wordRandom['blank-word'];
          }, 1000);
        }
      }
      
      else{
        player.life -= 1;
        player.imageNumber += 1;
        image.src = './hangman/' + player.imageNumber + '.jpg';

        event.target.style.display = "none";
      }
    }
    
    else{
      let question = `Score : ${player.score}\nWanna play again ?\nPress OK to play again`;

      if (confirm(question) == true){
        window.location.reload();
      }

      else{
        window.location.replace('https://google.com');
      }
    }
  }
}