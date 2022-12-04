export default class Hangman{
    constructor(data, word, clue, score, image, clue_btn, btn){
        this.data = data;
        this.word = word;
        this.clue = clue;
        this.score = score;
        this.image = image;
        this.clueBtn = clue_btn;
        this.btn = btn;

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

    gameStart(){
        this.fillBlankWord(this.gameData.word);
        this.clueBtn.style.display = "none";
        this.clueBtn.pointerEvents = "none";

        this.word.innerHTML = this.blankWord;
        this.clue.innerHTML = this.gameData.clue;
        this.score.innerHTML = this.scoreNum;
        this.image.src = `./Assets/hangman/${this.imageId}.jpg`;
    }

    youWin(){
        this.gameData = this.getData();

        this.blankWord = [];
        this.usedWord = [];

        this.randomWord = this.gameData.word;
        this.seperatedWord = this.randomWord.split('');

        for (let a of this.btn){
            a.style.background = "#fff";
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
                this.score.innerHTML = this.scoreNum;

                if (this.scoreNum >= this.data.length){
                    this.word.innerHTML = "Wow ! You completed the game !";
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
            if (this.life > 9){
                alert(`You Lose ! Your Score : ${this.scoreNum}`);
                window.location.reload();
            }

            else if (this.life === 4){
                this.clueBtn.style.display = "block";
                this.clueBtn.pointerEvents = "auto";
            }

            else{
                this.usedWord.push(clickedWord);
            }

            this.life += 1;
            this.imageId += 1;
            this.image.src = `./Assets/hangman/${this.imageId}.jpg`;
        }
    }
}