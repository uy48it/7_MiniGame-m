'use strict'

export default class PopUp {
    constructor() {
        this.gamemsg = document.querySelector(".gamemsg");
        this.msgTxt = document.querySelector(".gamemsg > span");
        this.reStartBtn = document.querySelector("#restart__btn");
        this.reStartBtn.addEventListener('click', () => {
            this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick){
        this.onClick = onClick; 
    }

    hide() {
        this.gamemsg.classList.add('hide');
    }

    hide_remove(){
        this.gamemsg.classList.remove('hide');
    }

    setText(txt) {
        this.msgTxt.innerHTML = txt;
    }
}