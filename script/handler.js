import { getData, wordData, scoreData, historyData, getHtml } from "./gameData.js";
import { removeListener, addListener } from "./listener.js";
import { checkType, giveClue } from "./play.js";
import { getWord } from "./app.js";


export let handleClick = (event) => {
    if (event.target.className == "keyboard-btn"){
        let key = event.target.innerHTML.toLowerCase();
        checkType(event.target, key);
    }
}

export let handleType = (event) => {
    let keyboard = document.querySelectorAll('.keyboard-btn');

    for (let i of keyboard){
        if (i.innerHTML.toLowerCase() == event.key){
            checkType(i, event.key);
            break;
        }
    }
}

export let handleClue = () => giveClue();

export let handleLose = () => {
    getHtml('notif-box').style.display = "none";
    getHtml('clue-btn').style.display = "none";

    addListener();

    scoreData.index = 0;
    scoreData.life = 0;
    scoreData.score = 0;

    historyData.time = 60;

    getHtml('image').src = `./assets/hangman/${scoreData.life}.jpg`;

    let keyboard = document.querySelectorAll('.keyboard-btn');

    for (let i of keyboard){
        if (historyData.usedWord.includes(i.innerHTML.toLowerCase())){
            i.style.background = "red";
        }
    }

    historyData.usedWord = [];
    getWord(scoreData.index);
    window.location.reload(false);
}