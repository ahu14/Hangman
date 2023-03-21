import { getData, wordData, scoreData, getHtml, historyData } from "./gameData.js";

export let getWord = (index) => {
    let target = wordData.data[index];
    wordData.word = target.word;
    wordData.clue = target.clue;
    wordData.blank = [];

    for (let i of wordData.word){
        wordData.blank.push('_');
    }

    getHtml('word').innerHTML = wordData.blank;
    getHtml('clue').innerHTML = wordData.clue;
    getHtml('score').innerHTML = scoreData.score;
}


let lastTime;

export let countTime = (time) => {
    let timeNum = historyData.time;
    
    lastTime = Math.round(time / 1000);
    getHtml('time').innerHTML = timeNum - lastTime;

    if (timeNum - lastTime > 56){
        requestAnimationFrame(countTime);
    }

    else{
        getHtml('notif-box').style.display = "flex";
        getHtml('score2').innerHTML = scoreData.score;

        requestAnimationFrame(countTime);
    }
}


getData()
.then(data => wordData.data = data)
.then(() => getWord(scoreData.index))
.then(() => requestAnimationFrame(countTime))