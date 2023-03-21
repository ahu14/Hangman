import { getWord, countTime } from "./app.js";
import { getData, wordData, scoreData, historyData, getHtml } from "./gameData.js";
import { checkType, giveClue } from "./play.js";


window.addEventListener('click', (event) => {
    if (event.target.className == "keyboard-btn"){
        let key = event.target.innerHTML.toLowerCase();
        checkType(key);
    }
})

window.addEventListener('keydown', (event) => checkType(event.key));



getHtml('clue-btn').addEventListener('click', () => giveClue());
getHtml('refresh-btn').addEventListener('click', () => {
    getHtml('notif-box').style.display = "none";
    historyData.time = 60;
})