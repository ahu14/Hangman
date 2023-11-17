export let getData = async () => {
    return new Promise((res, rej) => {
        fetch('./script/listWords.json')
        .then(response => response.json())
        .then(data => res(data))
        .catch(err => rej(err));
    })
}


export let wordData = {
    data : undefined,
    word : '', 
    clue : '',
    blank : []
}

export let scoreData = {
    index : 0,
    life : 0,
    score : 0
}

export let historyData = {
    usedWord : [],
    wrong : 0,
    time : 60
}


export let getHtml = (target) => {
    let theHtml = document.querySelectorAll(`#${target}`);
    return theHtml[0];
}