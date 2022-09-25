let list_words = ['apple', 'chicken', 'cucumber', 'brocolli', 'banana'];
let random_index = Math.floor(Math.random() * list_words.length);
let random_word = list_words[random_index];

let life = 10;
let image_number = 0;
let seperated_word = [];
let blank_word = [];

for (let i in random_word){
  seperated_word.push(random_word[i]);
  blank_word.push('_');
}

let word = document.querySelector('#word');
word.innerHTML = blank_word;

let image = document.querySelector('.image');
image.src = './hangman/' + image_number + '.jpg';

let clicked = (event) => {
  if (life !== 0){
    let text = event.target.innerText.toLowerCase();
    
    if (seperated_word.includes(text)){
      for (let i in seperated_word){
        if (seperated_word[i] == text){
          blank_word[i] = text;
          word.innerHTML = blank_word;
        }
      }
      
      if (!blank_word.includes('_')){
        word.innerHTML = 'you win !';
      
        if (confirm('play again ?? ')){
          txt = 'yes';
          window.location.reload();
        }
      }
    }
    
    else{
      life -= 1;
      image_number += 1;
      image.src = './hangman/' + image_number + '.jpg';
    }
  }
  
  else{
    alert('you lose. the answer is ' + random_word);
    window.location.reload()
  }
}