import EventEmitter from "./events.js";

export default class Hangman{
    constructor(data, word, clue, score, image, clue_btn, keyboardBtn, notif_box){
        this.data = data;
        this.word = word;
        this.clue = clue;
        this.score = score;
        this.image = image;
        this.clueBtn = clue_btn;
        this.keyboardBtn = keyboardBtn;
        this.notifBox = notif_box;

        this.index = -1;
        this.life = 0;
        this.scoreNum = 0;
        this.imageId = 0;
        this.usedWord = [];

        this.gameData = this.getData();
        this.randomWord = this.gameData.word;
        this.seperatedWord = this.randomWord.split('');
        this.blankWord = [];
    }

    randomNum(){
        this.index >= this.data.length - 1 ? this.index : this.index++;
        return this.index;
    }

    getData(){
        let index = this.randomNum();
        return this.data[index];
    }

    fillBlankWord(word){
        for (let a in word){
            this.blankWord.push('_');
        }
    }

    updateScore(){
        for (let i of score){
            i.innerHTML = this.scoreNum
        }
    }

    gameStart(){
        this.fillBlankWord(this.gameData.word);
        this.updateScore();
        this.notifBox.pointerEvents = "none";

        this.word.innerHTML = this.blankWord;
        this.clue.innerHTML = this.gameData.clue;
        this.image.src = `./assets/hangman/${this.imageId}.jpg`;
    }

    youWin(){
        this.gameData = this.getData();

        this.blankWord = [];
        this.usedWord = [];

        this.randomWord = this.gameData.word;
        this.seperatedWord = this.randomWord.split('');

        for (let a of this.keyboardBtn){
            a.style.background = "#f91a10";
            a.style.color = "#000";
        }

        this.gameStart();
    }

    giveClue(){
        for (let i in this.blankWord){
            if (this.blankWord[i] === '_'){
                this.blankWord[i] = this.seperatedWord[i];
                this.word.innerHTML = this.blankWord;

                this.clueBtn.style.display = "none";
                this.clueBtn.pointerEvents = "none";

                setTimeout(() => this.checkWord(this.blankWord[i]), 800);
                break;
            }
        }
    }

    updateImage(){
        this.life += 1;
        this.imageId += 1;
        this.image.src = `./assets/hangman/${this.imageId}.jpg`;
    }

    freezeScreen(){
        document.onkeyup = () => {}
        document.body.onclick = () => {}
        this.clueBtn.onclick = () => {}
    }

    checkWord(clickedWord){
        if (this.seperatedWord.includes(clickedWord)){
            for (let a in this.seperatedWord){
                if (this.seperatedWord[a] === clickedWord){
                    this.blankWord[a] = clickedWord;
                    this.word.innerHTML = this.blankWord;
                }
            }

            if (!this.blankWord.includes('_')){
                this.scoreNum += 1;
                this.updateScore();

                if (this.scoreNum == this.data.length){
                    this.freezeScreen();
                    this.notifBox.style.display = "flex";
                    this.notifBox.children[0].innerHTML = "Wow ! Good Job !";
                }

                else{
                    if (this.scoreNum % 2 === 0){
                        this.word.innerHTML = "good job !"
                    }
    
                    else{
                        this.word.innerHTML = "that's right !"
                    }
                }

                setTimeout(() => this.youWin(), 800);
            }
        }

        else{
            if (this.life > 8){
                this.freezeScreen()
                
                this.life = 9;
                this.imageId = 10;
                this.image.src = `./assets/hangman/${this.imageId}.jpg`;

                this.notifBox.style.display = "flex";
            }

            else if (this.life === 4){
                this.clueBtn.style.display = "block";
                this.clueBtn.pointerEvents = "auto";
                this.updateImage();
            }

            else{
                this.usedWord.push(clickedWord);
                this.updateImage();
            }
        }
    }
}