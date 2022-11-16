export default class Hangman{
    constructor(data, word, clue, score, image, btn){
        this.data = data;
        this.word = word;
        this.clue = clue;
        this.score = score;
        this.image = image;
        this.btn = btn;

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
        return Math.floor(Math.random() * this.data.length);
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

        this.imageId = 0;

        for (let a of this.btn){
            a.style.background = "#fff";
        }

        this.gameStart();
    }

    checkWord(clickedWord){
        if (this.seperatedWord.includes(clickedWord)){
            for (let a in this.seperatedWord){
                if (this.seperatedWord[a] === clickedWord){
                    this.blankWord[a] = clickedWord;
                    this.word.innerHTML = this.blankWord;
                    this.usedWord.push(clickedWord);
                }
            }

            if (!this.blankWord.includes('_')){
                this.word.innerHTML = "you win !";

                this.scoreNum += 1;
                this.score.innerHTML = this.scoreNum;

                setTimeout(() => this.youWin(), 1000);
            }
        }

        else{
            console.log(this.life);
            if (this.life > 9){
                alert('you lose !');
                window.location.reload();
            }

            else if (this.life >= 3){
                let wordLength = this.gameData.word.length;
                let randomIndex = Math.floor(Math.random() * wordLength);
                let help = this.gameData.word;

                this.blankWord[randomIndex] = help[randomIndex];
                this.word.innerHTML = this.blankWord;
            }

            else{
                this.usedWord.push(clickedWord);
                this.life += 1;
                this.imageId += 1;
                this.image.src = `./Assets/hangman/${this.imageId}.jpg`;
            }
        }
    }
}