'use strict'

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
const reStartBtn = document.querySelector("#restart__btn");
const startmsg = document.querySelector(".start");
const scoremsg = document.querySelector("#score");
const timer = document.querySelector("#timer");
const gamemsg = document.querySelector(".gamemsg");


// Timer == 0 이면 게임 끝 
// Score == 10 or Bug 만지면 Timer 멈추고 끝

function gamestart() {
    let score = 0;
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
    const timerFunc = setInterval(()=>{
        timer.innerHTML = `0:0${i}`;
        i--;    
        // 타임아웃시?
        if (i < 0) { clearInterval(timerFunc); 
            //동작 멈추는 함수
            gameoverFunc();
        }
    },1000);
    // 벌레 & 당근 클릭 수에 맞춰서 Score를 나타낼거야
    // 그리고 클릭하면 사라지게 할거야!
    setScore(score, timerFunc);

    
}


// 점수 함수
function setScore(score, func) {
    document.addEventListener('click',(e)=>{
        if(e.target.tagName == 'IMG'){
            if (e.target.className == 'bug') {
                gameoverFunc();
                clearInterval(func);
            } else {
                e.target.classList.add('hide');
                score++;
                scoremsg.innerHTML = score;
                if(score == 10) {
                    clearInterval(func);
                    gameClear();
                }
            }
        }
    });
}

const span = document.querySelector(".gamemsg > span");

// GameOver() : 모든 동작을 멈추고 img를 다 삭제
function gameoverFunc() {
    span.innerHTML = "Game Over!";
    gamemsg.classList.remove('hide');

    const imgs = document.querySelectorAll("img");
    imgs.forEach(img=>{
        img.classList.add('hide');
    });
}

// GameClear()
function gameClear(){
    span.innerHTML = "Game Clear!";
    gamemsg.classList.remove('hide');
}

//일시정지


StartBtn.addEventListener('click', () => {
    gamestart();
});

reStartBtn.addEventListener('click', () => {
    gamemsg.classList.add('hide');
    gamestart();
});