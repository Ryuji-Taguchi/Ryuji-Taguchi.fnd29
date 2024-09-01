'use strict'

// document.write('<p  style="position:relative; top:-220px; left: 240px;  width: 40px;  height: 40px; overflow: hidden;" id=blue_puyo"><img  width="242" style = "position: relative; left: -121px;" src="puyopuyo.png"></p>')

const redPuyo = 'width: 40px;  height: 40px;  overflow: hidden;" id="red_puyo"><img  width="242" src="images/puyopuyo.png"></p>'
const greenPuyo = 'width: 40px;  height: 40px; overflow: hidden;" id="green_puyo"><img  width="242" style = "position: relative; left: -40px;" src="images/puyopuyo.png"></p>'
const bluePuyo = 'width: 40px;  height: 40px; overflow: hidden;" id=blue_puyo><img  width="242" style = "position: relative; left: -81px;" src="images/puyopuyo.png"></p>'
const yellowPuyo = 'width: 40px;  height: 40px; overflow: hidden;" id=yellow_puyo><img  width="242" style = "position: relative; left: -121px;" src="images/puyopuyo.png"></p>'

const stageStatus = {
  isPuyo: false,
  isColor: "",
  isChecked: false,
  isFallingPuyo: false,
  html: "",
  x: 0,
  y: 0
};

const puyoColor = ["redPuyo","greenPuyo","bluePuyo","yellowPuyo"]

const saveStatus = {};

const lineArray = [JSON.parse(JSON.stringify(stageStatus)), JSON.parse(JSON.stringify(stageStatus)), JSON.parse(JSON.stringify(stageStatus)), JSON.parse(JSON.stringify(stageStatus)), JSON.parse(JSON.stringify(stageStatus)), JSON.parse(JSON.stringify(stageStatus))]

//ネクスト・ネクネクオブジェクト
const nextPuyo1 = {};
const nextPuyo2 = {};
const nextnextPuyo1 = {};
const nextnextPuyo2 = {};

//捜査ぷよ位置保存配列
let checkPuyoArray = [];

//ぷよ描画用文字列
let htmlCode = "";

//ぷよ落下判定
let fall = false;

//ぷよの移動間隔制御
let canMovePuyo = true;

//ぷよの座標
let x;
let y;

let subx;
let suby;

//追従ぷよの位置
let subPuyoPos;

//ぷよ作成フラグ
let createPuyo = true;

//ぷよ消したかフラグ
let isDeleted = false;

//連鎖数
let chain = 0;

//最大連鎖数
let maxChains = 0;

const stage = [
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  JSON.parse(JSON.stringify(lineArray)),
  ];



function gameStart() {
  //ステージ初期化
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 6; j++) {
      stage[i][j].isPuyo = false;
      stage[i][j].y = i;
      stage[i][j].x = j;

      if (i === 12) {
        stage[i][j].isPuyo = false;
      }
    }
  }

  document.getElementById("gameOver").style.display = "none";
  game();
}

initialPuyo();
  
async function game(){

  while (true) {
    fall = false;

    await sleep(0.4)
    setInterval(canMovePuyo = true, 2000)

    //最初のぷよを配置
    if (createPuyo === true) {
      if (stage[1][2].isPuyo === true) {
        const batanQ = document.getElementById("gameOver")
        batanQ.style.display = "block";

        break;
      }

      createNewPuyo();
      
    }

    document.addEventListener('keydown', (e) => {
      // キーボードが押された場合
      if (e.key === "ArrowLeft" && canMovePuyo && stage[y][x].isFallingPuyo === true && stage[suby][subx].isFallingPuyo === true) {
        keyPress(e.key);
        canMovePuyo = false;
      }
      if (e.key === "ArrowRight" && canMovePuyo && stage[y][x].isFallingPuyo === true && stage[suby][subx].isFallingPuyo === true) {
        keyPress(e.key);
        canMovePuyo = false;
      }
      if (e.key === "z" && canMovePuyo && stage[y][x].isFallingPuyo === true && stage[suby][subx].isFallingPuyo === true) {
        keyPress(e.key);
        canMovePuyo = false;
      }});
    
    //下にぷよが無い場合、落下を実施
    fall = true
    fallPuyo(fall);

    drawBoard();

    //床についたら設置・消滅判定
    if (y === 12 || suby === 12 || (stage[y + 1][x].isFallingPuyo === false && stage[y + 1][x].isPuyo === true) || (stage[suby + 1][subx].isFallingPuyo === false && stage[suby + 1][subx].isPuyo === true)) {
      stage[y][x].isFallingPuyo = false;
      stage[suby][subx].isFallingPuyo = false;

      while (true) {
        isDeleted = false;

        for (let i = 11; i >= 0; i--) {
          for (let j = 5; j >= 0; j--) {
            
            checkPuyoFall(i,j);

          }
        }

        drawBoard();
        await sleep(0.5);

        for (let i = 0; i < 13; i++) {
          for (let j = 0; j < 6; j++) {
            if (stage[i][j].isColor !== "") {
              
              checkPuyoDelete(i,j);
              deletePuyo();

              //精査数を初期化
              for (const value of checkPuyoArray) {
                stage[value[0]][value[1]].isChecked = false;
              }
              checkPuyoArray = [];

            } else {
              continue;
            }
          }
        }
                
        drawBoard();
        await sleep(0.5);

        //ループ終了
        if (isDeleted === false) {
          chain = 0;
          createPuyo = true;
          break;
        }

        chain++;
        if (chain > maxChains) {
          maxChains = chain;  
          document.getElementById("chain").innerHTML = "最大連鎖数<br>" + String(maxChains) +  "れんさ！"
        }
      }
    }

  }

  
}
