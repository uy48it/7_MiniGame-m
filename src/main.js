'use strict'
import PopUp from './popup.js'

// 1. img 생성
const gamestage = document.querySelector(".gamestage");

function makeImg(Cname, Spath) {
    // 1. 이미지 생성
    const img = document.createElement('img');
    img.setAttribute('class',Cname);
    img.setAttribute('src', Spath);

    //2.이미지 배치
    const Wmax = gamestage.clientWidth*0.93;
    const Hmax = gamestage.clientHeight*0.75;   
    const W = Math.random() * Wmax;
    const H = Math.random() * Hmax;
    img.style.transform = `translate(${W}px,${H}px)`;

    gamestage.append(img);
}

function drawImg(Cname, Sadress,num){
    for(num ; num > 0 ; num--){
        makeImg(Cname,Sadress);
    }
}

//시작버튼이벤트
const StartBtn = document.querySelector("#start__btn");
const startmsg = document.querySelector(".start");
const scoremsg = document.querySelector("#score");
const timer = document.querySelector("#timer");
const PopupMessage = new PopUp();


// Timer == 0 이면 게임 끝 
// Score == 10 or Bug 만지면 Timer 멈추고 끝
let score = 0;
let timerF;

function gamestart() {
    scoremsg.innerHTML = score;
    //start 창 안보이게
    startmsg.classList.add('hide');

    // 벌레 & 당근 추가
    drawImg("bug", "img/bug.png",10);
    drawImg("carrot", "img/carrot.png",10);

    // 타이머가 가게 할거고 0이되면 모든 동작 멈추고 GameOver 동작
    let i = 10;
    timer.innerHTML = `0:${i}`;
    i--;
    timerF = setInterval(()=>{
        timer.innerHTML = `0:0${i}`;
        i--;    
        // 타임아웃시?
        if (i < 0) { 
            clearInterval(timerF); 
            gameoverFunc();
        }
    },1000);
    // 벌레 & 당근 클릭 수에 맞춰서 Score를 나타낼거야
    // 그리고 클릭하면 사라지게 할거야!
    setScore(score);    
}

const carrot_audio = new Audio('sound/carrot_pull.mp3');

// 점수 함수
function setScore(score) {
    document.addEventListener('click',(e)=>{
        if(e.target.tagName == 'IMG'){
            if (e.target.className == 'bug') {
                score = 0;
                clearInterval(timerF);        
                gameoverFunc();        
            } else if (e.target.className == 'carrot') {
                e.target.classList.add('hide');
                carrot_audio.play();
                score++;
                scoremsg.innerHTML = score;
                if(score == 10) {
                    score = 0;
                    clearInterval(timerF);
                    gameClear();
                    return;
                }
            }
        }
    });
}


// GameOver() : 모든 동작을 멈추고 img를 다 삭제
function gameoverFunc() {
    PopupMessage.setText("Game Over!");
    PopupMessage.hide_remove();

    const imgs = document.querySelectorAll("img");
    imgs.forEach(img=>{
        img.classList.add('hide');
    });
}

// GameClear()
function gameClear(){
    PopupMessage.setText("Game Clear!");
    PopupMessage.hide_remove();
}

//일시정지


StartBtn.addEventListener('click', () => {
    gamestart();
});

PopupMessage.setClickListener(() => {
    gamestart();
});