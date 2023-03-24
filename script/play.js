import { removeListener, addListener } from "./listener.js";
import { wordData, scoreData, historyData, getHtml } from "./gameData.js";
import { getWord } from "./app.js";

export let giveClue = () => {
    let answer = wordData.word;
    let blank = wordData.blank;

    for (let i = 0; i < answer.length; i++){
        if (blank[i] == '_'){
            blank[i] = answer[i];
            getHtml('word').innerHTML = blank;
            getHtml('clue-btn').style.display = "none";
            checkWord(answer[i]);
            break;
        }
    }
}


export let updateImage = () => {
    if (scoreData.life >= 10){
        getHtml('notif-box').style.display = "flex";
        getHtml('score2').innerHTML = scoreData.score;

        removeListener();
    }

    else{
        scoreData.life += 1;
        getHtml('image').src = `./assets/hangman/${scoreData.life}.jpg`;
    }
}


export let checkWord = (key) => {
    let answer = wordData.word;
    let blank = wordData.blank;

    if (answer.includes(key)){
        for (let i = 0; i < answer.length; i++){
            if (answer[i] == key){
                blank[i] = answer[i];
                getHtml('word').innerHTML = blank;
            }
        }
    }

    else{
        historyData.wrong += 1;
        updateImage();
        
        if (historyData.wrong % 3 == 0){
            getHtml('clue-btn').style.display = "block";
        }
    }


    if (!blank.includes('_')){
        removeListener();

        let keyboard = document.querySelectorAll('.keyboard-btn');
        let usedWord = historyData.usedWord;

        for (let i of keyboard){
            if (usedWord.includes(i.innerHTML.toLowerCase())){
                i.style.background = "red";
            }
        }

        historyData.usedWord = [];

        scoreData.score += 1;
        getHtml('score').innerHTML = scoreData.score;
        getHtml('word').innerHTML = "Good One !";

        setTimeout(() => {
            getHtml('word').innerHTML = wordData.blank;

            scoreData.index += 1;
            getWord(scoreData.index);
        }, 500);
    }
}


export let checkType = (target, key) => {
    if (!historyData.usedWord.includes(key)){        
        target.style.background = "pink";

        historyData.usedWord.push(key);
        checkWord(key);
    }
}