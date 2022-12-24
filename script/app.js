import Hangman from "./Hangman.js";

let word = document.querySelector('#word');
let clue = document.querySelector('#clue');
let image = document.querySelector('.image');
let score = document.querySelectorAll('#score');

let clue_btn = document.querySelector('.clue-btn');
let keyboard_btn = document.querySelectorAll('.keyboard-btn');
let notif_box = document.querySelector('.notif-box');
let refresh_btn = document.querySelector('.refresh-btn');



let shuffleData = (data) => {
    let currentIndex = data.length;

    while (currentIndex != 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [data[currentIndex], data[randomIndex]] = [
            data[randomIndex], data[currentIndex]
        ]
    }

    return data;
}



fetch('./script/listWords.json')
.then(res => res.json())
.then(data => {
    let newData = shuffleData(data);

    let game = new Hangman(
        newData, word, clue, score, image, 
        clue_btn, keyboard_btn, notif_box
    );
    game.gameStart();

    document.onkeyup = (event) => {
        if (!game.usedWord.includes(event.key)){
            game.checkWord(event.key);

            for (let i of keyboard_btn){
                let lowerText = i.innerText.toLowerCase();
    
                if (lowerText === event.key){
                    i.style.background = '#ee0000';
                }
            }
        }  
    }

    document.body.onclick = (event) => {
        let btn = event.target;
        let lowerText = btn.innerText.toLowerCase();

        if (btn.className === 'keyboard-btn' &&
            !game.usedWord.includes(lowerText)){
            btn.style.background = '#ee0000';
            game.checkWord(lowerText);
        }
    }

    clue_btn.onclick = (event) => {
        game.giveClue();
    }

    refresh_btn.onclick = (event) => {
        window.location.reload();
    }
})
.catch(err => console.log(err))