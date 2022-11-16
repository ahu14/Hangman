import Hangman from "./Hangman.js";

let word = document.querySelector('#word');
let clue = document.querySelector('#clue');
let image = document.querySelector('.image');
let score = document.querySelector('#score');

let keyboard_btn = document.querySelectorAll('.keyboard-btn');


fetch('./script/listWords.json')
.then(res => res.json())
.then(data => {
    let game = new Hangman(
        data, word, clue, score,
        image, keyboard_btn
    );
    game.gameStart();

    document.addEventListener('keyup', (event) => {        
        if (!game.usedWord.includes(event.key)){
            game.checkWord(event.key);

            for (let i of keyboard_btn){
                let lowerText = i.innerText.toLowerCase();
    
                if (lowerText === event.key){
                    i.style.background = '#ee0000';
                }
            }
        }
    })

    document.body.addEventListener('click', (event) => {
        let btn = event.target;
        let lowerText = btn.innerText.toLowerCase();

        if (btn.className === 'keyboard-btn' &&
            !game.usedWord.includes(lowerText)){
            btn.style.background = '#ee0000';
            game.checkWord(lowerText);
        }
    })
})
.catch(err => console.log(err))