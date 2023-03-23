import { removeListener, addListener } from "./listener.js";
import { handleClick, handleLose, handleType, handleClue } from "./handler.js";
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

    addListener();
}


let finishTime = 1;
setInterval(() => {
    if (historyData.time < finishTime){
        getHtml('notif-box').style.display = "flex";
        getHtml('score2').innerHTML = scoreData.score;

        historyData.time = finishTime;
        getHtml('time').innerHTML = historyData.time;

        
    }

    historyData.time -= 1;
    getHtml('time').innerHTML = historyData.time;
}, 1000);


getData()
.then(data => wordData.data = data)
.then(() => getWord(scoreData.index))