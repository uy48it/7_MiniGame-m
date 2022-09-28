'use strict'
import Game from './game.js';
import PopUp from './popup.js'

const PopupMessage = new PopUp();
// game(팝업창, 개수, 시간초)
const game = new Game(PopupMessage,20,10);

