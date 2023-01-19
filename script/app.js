import Hangman from "./Hangman.js";

let word = document.querySelector('#word');
let clue = document.querySelector('#clue');
let image = document.querySelector('.image');
let score = document.querySelectorAll('#score');

let clue_btn = document.querySelector('.clue-btn');
let keyboard_btn = document.querySelectorAll('.keyboard-btn');
let notif_box = document.querySelector('.notif-box');
let refresh_btn = document.querySelector('.refresh-btn');

let notif_message = document.querySelector('#notif-message');
let time = document.querySelector('#time');
let timeNum = 60;
time.innerHTML = timeNum;



let startTime;
let lastNum;
function printFrame(timee){
    if (startTime == undefined){
        startTime = Math.round(timee / 1000);
    }

    if (lastNum == undefined || lastNum != Math.round(timee / 1000) - startTime){
        lastNum = Math.round(timee / 1000) - startTime;
    }


    if (timeNum - lastNum < 0){
        document.onkeyup = () => {}
        document.body.onclick = () => {}
        clue_btn.onclick = () => {}

        notif_box.style.display = "flex";
        notif_message.innerHTML = "Time's up";
    }

    else{
        if (notif_box.style.display != "flex"){
            time.innerHTML = timeNum - lastNum;
        }
    }

    requestAnimationFrame(printFrame);
}

requestAnimationFrame(printFrame)



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



async function getData(){
    let response = await fetch('./script/listWords.json');

    if (!response.ok){
        throw new Error(response.status);
    }

    let data = await response.json();
    return data;
}

getData().then(data => {
    let newData = shuffleData(data);

    let game = new Hangman(
        newData, word, clue, score, image, 
        clue_btn, keyboard_btn, notif_box, time, timeNum
    );
    game.gameStart();

    document.onkeyup = (event) => {
        if (!game.usedWord.includes(event.key)){
            game.checkWord(event.key);

            for (let i of keyboard_btn){
                let lowerText = i.innerText.toLowerCase();
    
                if (lowerText === event.key){
                    i.style.background = '#3c0f0f';
                    i.style.color = '#edb195';
                }
            }
        }  
    }

    document.body.onclick = (event) => {
        let btn = event.target;
        let lowerText = btn.innerText.toLowerCase();

        if (btn.className === 'keyboard-btn' &&
            !game.usedWord.includes(lowerText)){
            btn.style.background = '#3c0f0f';
            btn.style.color = '#edb195';
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