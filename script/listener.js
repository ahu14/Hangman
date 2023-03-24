import { getData, wordData, scoreData, historyData, getHtml } from "./gameData.js";
import { handleClick, handleLose, handleType, handleClue } from "./handler.js";
import { checkType, giveClue } from "./play.js";
import { getWord } from "./app.js";


export let addListener = () => {
    window.addEventListener('click', handleClick, false);
    window.addEventListener('keydown', handleType, false);
    getHtml('clue-btn').addEventListener('click', handleClue, false);
    getHtml('refresh-btn').addEventListener('click', handleLose, false);
}

export let removeListener = () => {
    window.removeEventListener('click', handleClick, false);
    window.removeEventListener('keydown', handleType, false);
    getHtml('clue-btn').removeEventListener('click', handleClue, false);
}