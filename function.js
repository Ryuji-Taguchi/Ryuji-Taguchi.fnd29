/**
 * 下からフィールドの浮いているぷよを調べ、落下させる
 * 落下したかどうかのbooleanを返す
 * @param {number} y 
 * @param {number} x 
 * @returns 
 */

function checkPuyoFall(y,x) {
    let falledPos = y;
  
    if (stage[y][x].isColor !== "") {
      if (stage[y + 1][x].isColor === "") {
        while (falledPos !== 12 && stage[falledPos + 1][x].isColor === "") {
          falledPos++;
        }
        
      //ぷよを移動
      stage[falledPos][x].isPuyo = true;
      
      stage[falledPos][x].isColor = stage[y][x].isColor;
      stage[falledPos][x].html = stage[y][x].html;
      
      //元々の場所を空ける
      stage[y][x].isPuyo = false;
      stage[y][x].isColor = "";
      stage[y][x].html = "";
      }
    }
}

//ランダムな数値を得る
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
function initialPuyo() {
    let color1 = getRandomInt(4);
    let color2 = getRandomInt(4);
  
    nextPuyo1.isPuyo = true;
    nextPuyo2.isPuyo = true;
  
    nextPuyo1.isColor = puyoColor[color1];
    nextPuyo2.isColor = puyoColor[color2];
  
    switch (nextPuyo1.isColor) {
      case 'yellowPuyo':
        nextPuyo1.html = yellowPuyo;
        break;
      case 'redPuyo':
        nextPuyo1.html = redPuyo;
        break;
      case 'bluePuyo':
        nextPuyo1.html = bluePuyo;
        break;
      case 'greenPuyo':
        nextPuyo1.html = greenPuyo;
        break;
    }
  
    switch (nextPuyo2.isColor) {
      case 'yellowPuyo':
        nextPuyo2.html = yellowPuyo;
        break; 
      case 'redPuyo':
        nextPuyo2.html = redPuyo;
        break; 
      case 'bluePuyo':
        nextPuyo2.html = bluePuyo;
        break; 
      case 'greenPuyo':
        nextPuyo2.html = greenPuyo;
        break; 
    }
  
    color1 = getRandomInt(4);
    color2 = getRandomInt(4);
  
    nextnextPuyo1.isPuyo = true;
    nextnextPuyo2.isPuyo = true;
  
    nextnextPuyo1.isColor = puyoColor[color1];
    nextnextPuyo2.isColor = puyoColor[color2];
  
    switch (nextnextPuyo1.isColor) {
      case 'yellowPuyo':
        nextnextPuyo1.html = yellowPuyo;
        break;
      case 'redPuyo':
        nextnextPuyo1.html = redPuyo;
        break;
      case 'bluePuyo':
        nextnextPuyo1.html = bluePuyo;
        break;
      case 'greenPuyo':
        nextnextPuyo1.html = greenPuyo;
        break;
    }
  
    switch (nextnextPuyo2.isColor) {
      case 'yellowPuyo':
        nextnextPuyo2.html = yellowPuyo;
        break; 
      case 'redPuyo':
        nextnextPuyo2.html = redPuyo;
        break; 
      case 'bluePuyo':
        nextnextPuyo2.html = bluePuyo;
        break; 
      case 'greenPuyo':
        nextnextPuyo2.html = greenPuyo;
        break; 
    }
  }
  
  function createNewPuyo() {
    //ネクストから次のぷよを取得
    stage[0][2].isPuyo = true;
    stage[0][3].isPuyo = true;
  
    stage[0][2].isColor = nextPuyo1.isColor;
    stage[0][3].isColor = nextPuyo2.isColor;
  
    stage[0][2].html = nextPuyo1.html;
    stage[0][3].html = nextPuyo2.html;
  
    //ネクネクからネクストへ値を移動
    nextPuyo1.isColor = nextnextPuyo1.isColor;
    nextPuyo2.isColor = nextnextPuyo2.isColor;
  
    nextPuyo1.html = nextnextPuyo1.html;
    nextPuyo2.html = nextnextPuyo2.html;
  
    //ネクネクを作成
    let color1 = getRandomInt(4);
    let color2 = getRandomInt(4);
  
    nextnextPuyo1.isColor = puyoColor[color1];
    nextnextPuyo2.isColor = puyoColor[color2];
    
  
    switch (nextnextPuyo1.isColor) {
      case 'yellowPuyo':
        nextnextPuyo1.html = yellowPuyo;
        break;
      case 'redPuyo':
        nextnextPuyo1.html = redPuyo;
        break;
      case 'bluePuyo':
        nextnextPuyo1.html = bluePuyo;
        break;
      case 'greenPuyo':
        nextnextPuyo1.html = greenPuyo;
        break;
    }
  
    switch (nextnextPuyo2.isColor) {
      case 'yellowPuyo':
        nextnextPuyo2.html = yellowPuyo;
        break; 
      case 'redPuyo':
        nextnextPuyo2.html = redPuyo;
        break; 
      case 'bluePuyo':
        nextnextPuyo2.html = bluePuyo;
        break; 
      case 'greenPuyo':
        nextnextPuyo2.html = greenPuyo;
        break; 
    }
  
    
    x = 2;
    y = 0;
  
    subx = 3;
    suby = 0;
  
    stage[0][2].isFallingPuyo = true;
    stage[0][3].isFallingPuyo = true;
  
    subPuyoPos = "right";
  
    createPuyo = false;
  
  }
  
  /**
   * 同じ色のぷよを探し、配列に座標を保存する
   * @param {number} x 精査対象座標x
   * @param {number} y 精査対象座標y
   * 
   */
  
  function checkPuyoDelete(y,x) {
    checkPuyoArray.push([stage[y][x].y,stage[y][x].x]);
    stage[y][x].isChecked = true;
  
    for(let i = 0; i < 4; i++) {
      //一番上に設置した際は、一つ上をチェックしない
      if (y !== 0){
        if (stage[y - 1][x].isColor === stage[y][x].isColor && stage[y - 1][x].isChecked === false) {
          checkPuyoDelete(y - 1,x);
        }
      }
      //右側チェック
      if (x !== 5){
        if (stage[y][x + 1].isColor === stage[y][x].isColor && stage[y][x + 1].isChecked === false) {
          checkPuyoDelete(y,x + 1);
        }
      }
      //下側チェック
      if (y !== 12){
        if (stage[y + 1][x].isColor === stage[y][x].isColor && stage[y + 1][x].isChecked === false) {
          checkPuyoDelete(y + 1,x);
        }
      }
      //左側チェック
      if (x !== 0){
        if (stage[y][x - 1].isColor === stage[y][x].isColor && stage[y][x - 1].isChecked === false) {
          checkPuyoDelete(y,x - 1);
        }
      }
    }
  }
  
  
  /**
   * ぷよが4つ以上つながっていた場合、削除するための関数
   */
  
  function deletePuyo() {
  
    if (checkPuyoArray.length >= 4) {
      for (const value of checkPuyoArray) {

        stage[value[0]][value[1]].isPuyo = false;
        stage[value[0]][value[1]].isColor = "";
      }
  
      isDeleted = true;
    }
  
  }
  
  function puyoMoveLeft() {
    if (x < subx) {
      //ぷよを移動
      stage[y][x - 1].isPuyo = true;
      
      stage[y][x - 1].isColor = stage[y][x].isColor;
      stage[y][x - 1].html = stage[y][x].html;
      stage[y][x - 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[y][x].isPuyo = false;
      stage[y][x].isColor = "";
      stage[y][x].html = "";
  
      x--;
  
      //ぷよを移動
      stage[suby][subx - 1].isPuyo = true;
      
      stage[suby][subx - 1].isColor = stage[suby][subx].isColor;
      stage[suby][subx - 1].html = stage[suby][subx].html;
      stage[suby][subx - 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[suby][subx].isPuyo = false;
      stage[suby][subx].isColor = "";
      stage[suby][subx].html = "";
  
      subx--;
    } else {
      //ぷよを移動
      stage[suby][subx - 1].isPuyo = true;
      
      stage[suby][subx - 1].isColor = stage[suby][subx].isColor;
      stage[suby][subx - 1].html = stage[suby][subx].html;
      stage[suby][subx - 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[suby][subx].isPuyo = false;
      stage[suby][subx].isColor = "";
      stage[suby][subx].html = "";
  
      subx--;
  
      //ぷよを移動
      stage[y][x - 1].isPuyo = true;
      
      stage[y][x - 1].isColor = stage[y][x].isColor;
      stage[y][x - 1].html = stage[y][x].html;
      stage[y][x - 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[y][x].isPuyo = false;
      stage[y][x].isColor = "";
      stage[y][x].html = "";
  
      x--;
    }
  }
  
  function puyoMoveRight() {
    if (x > subx) {
      //ぷよを移動
      stage[y][x + 1].isPuyo = true;
      
      stage[y][x + 1].isColor = stage[y][x].isColor;
      stage[y][x + 1].html = stage[y][x].html;
      stage[y][x + 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[y][x].isPuyo = false;
      stage[y][x].isColor = "";
      stage[y][x].html = "";
  
      x++;
  
      //ぷよを移動
      stage[suby][subx + 1].isPuyo = true;
      
      stage[suby][subx + 1].isColor = stage[suby][subx].isColor;
      stage[suby][subx + 1].html = stage[suby][subx].html;
      stage[suby][subx + 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[suby][subx].isPuyo = false;
      stage[suby][subx].isColor = "";
      stage[suby][subx].html = "";
  
      subx++;
    } else {
      //ぷよを移動
      stage[suby][subx + 1].isPuyo = true;
      
      stage[suby][subx + 1].isColor = stage[suby][subx].isColor;
      stage[suby][subx + 1].html = stage[suby][subx].html;
      stage[suby][subx + 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[suby][subx].isPuyo = false;
      stage[suby][subx].isColor = "";
      stage[suby][subx].html = "";
  
      subx++;
  
      //ぷよを移動
      stage[y][x + 1].isPuyo = true;
      
      stage[y][x + 1].isColor = stage[y][x].isColor;
      stage[y][x + 1].html = stage[y][x].html;
      stage[y][x + 1].isFallingPuyo = true;
      
      //元々の場所を空ける
      stage[y][x].isPuyo = false;
      stage[y][x].isColor = "";
      stage[y][x].html = "";
  
      x++;
    }
  }
  
  /**
   *  htmlを描写するための関数
   */
  
  function drawBoard() {
    htmlCode += '<p  style="position:absolute; top:150px; left: 910px; z-index: 10;' + nextPuyo1.html;
    htmlCode += '<p  style="position:absolute; top:150px; left: 950px; z-index: 10;' + nextPuyo2.html;
    htmlCode += '<p  style="position:absolute; top:230px; left: 960px; z-index: 10;' + nextnextPuyo1.html;
    htmlCode += '<p  style="position:absolute; top:230px; left: 1000px; z-index: 10;' + nextnextPuyo2.html;
  
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 6; j++) {
        if (stage[i][j].isPuyo === true) {
          htmlCode += '<p  style="position:absolute; top:' + String(95 + 40 * stage[i][j].y) + 'px; left: ' + String(640 + 40 * stage[i][j].x) + 'px; ' + stage[i][j].html;
          
        } else {
          continue;
        }
      }
    }
  
    document.getElementById("puyoBoard").innerHTML=htmlCode;
    htmlCode = "";
  }
  
  /**
   * ぷよ落下の処理
   * @param {boolean} fall 
   */
  function fallPuyo(fall) {
    if (fall === true) {
      if (y > suby) {
        stage[y + 1][x].isPuyo = true;
        
        stage[y + 1][x].isColor = stage[y][x].isColor;
        stage[y + 1][x].html = stage[y][x].html;
        stage[y + 1][x].isFallingPuyo = true;
  
        stage[y][x].isPuyo = false;
        stage[y][x].isFallingPuyo = true;
        stage[y][x].isColor = "";
        stage[y][x].html = "";
        
        y++;
  
        stage[suby + 1][subx].isPuyo = true;
        
        stage[suby + 1][subx].isColor = stage[suby][subx].isColor;
        stage[suby + 1][subx].html = stage[suby][subx].html;
        stage[suby + 1][subx].isFallingPuyo = true;
  
        stage[suby][subx].isPuyo = false;
        stage[suby][subx].isColor = "";
        stage[suby][subx].html = "";
        
        suby++;
  
      } else {
          stage[suby + 1][subx].isPuyo = true;
          
          stage[suby + 1][subx].isColor = stage[suby][subx].isColor;
          stage[suby + 1][subx].html = stage[suby][subx].html;
          stage[suby + 1][subx].isFallingPuyo = true;
  
          stage[suby][subx].isPuyo = false;
          stage[suby][subx].isColor = "";
          stage[suby][subx].html = "";
          
          suby++;
  
          stage[y + 1][x].isPuyo = true;
                  
          stage[y + 1][x].isColor = stage[y][x].isColor;
          stage[y + 1][x].html = stage[y][x].html;
          stage[y + 1][x].isFallingPuyo = true;
    
          stage[y][x].isPuyo = false;
          stage[y][x].isFallingPuyo = true;
          stage[y][x].isColor = "";
          stage[y][x].html = "";
          
          y++;
    
      }
    }  
  }
  
  function rotatePuyo(){
    if (subPuyoPos === "right") {
      if(stage[suby + 1][subx - 1].isPuyo === false) {
        //ぷよを移動
        stage[suby + 1][subx - 1].isPuyo = true;
        
        stage[suby + 1][subx - 1].isColor = stage[suby][subx].isColor;
        stage[suby + 1][subx - 1].html = stage[suby][subx].html;
        stage[suby + 1][subx - 1].isFallingPuyo = true;
        
        //元々の場所を空ける
        stage[suby][subx].isPuyo = false;
        stage[suby][subx].isColor = "";
        stage[suby][subx].html = "";
  
        suby++;
        subx--;
  
        subPuyoPos = "bottom";
      }
    } else   if (subPuyoPos === "bottom") {
      if(stage[suby - 1][subx - 1].isPuyo === false) {
        //ぷよを移動
        stage[suby - 1][subx - 1].isPuyo = true;
        
        stage[suby - 1][subx - 1].isColor = stage[suby][subx].isColor;
        stage[suby - 1][subx - 1].html = stage[suby][subx].html;
        stage[suby - 1][subx - 1].isFallingPuyo = true;
        
        //元々の場所を空ける
        stage[suby][subx].isPuyo = false;
        stage[suby][subx].isColor = "";
        stage[suby][subx].html = "";
  
        suby--;
        subx--;
  
        subPuyoPos = "left";
      }
    } else   if (subPuyoPos === "left") {
      if(stage[suby - 1][subx + 1].isPuyo === false) {
        //ぷよを移動
        stage[suby - 1][subx + 1].isPuyo = true;
        
        stage[suby - 1][subx + 1].isColor = stage[suby][subx].isColor;
        stage[suby - 1][subx + 1].html = stage[suby][subx].html;
        stage[suby - 1][subx + 1].isFallingPuyo = true;
        
        //元々の場所を空ける
        stage[suby][subx].isPuyo = false;
        stage[suby][subx].isColor = "";
        stage[suby][subx].html = "";
  
        suby--;
        subx++;
  
        subPuyoPos = "top";
      } 
    } else   if (subPuyoPos === "top") {
        if(stage[suby + 1][subx + 1].isPuyo === false) {
          //ぷよを移動
          stage[suby + 1][subx + 1].isPuyo = true;
          
          stage[suby + 1][subx + 1].isColor = stage[suby][subx].isColor;
          stage[suby + 1][subx + 1].html = stage[suby][subx].html;
          stage[suby + 1][subx + 1].isFallingPuyo = true;
          
          //元々の場所を空ける
          stage[suby][subx].isPuyo = false;
          stage[suby][subx].isColor = "";
          stage[suby][subx].html = "";
    
          suby++;
          subx++;
    
          subPuyoPos = "right"
        }
      }
    }
  
  /**
   * 入力されたキーに応じてぷよを回転・移動させる
   * @param {string} key 
   * @returns 
   */
  function keyPress(key) {
    switch(key) {
      //左キー
      case 'ArrowLeft':
        //移動先にぷよがあるかチェック
        if (x === 0 || subx === 0) {
          return;
        }
  
        if (stage[y][x - 1].isPuyo !== true || stage[y][x - 1].isFallingPuyo === true && 
          stage[suby][subx - 1].isPuyo !== true || stage[suby][subx - 1].isFallingPuyo === true) {
          
          puyoMoveLeft();
          break;
        }
      case 'ArrowRight':
        //移動先にぷよがあるかチェック
        if (x === 5 || subx === 5) {
          return;
        }
  
        if (stage[y][x + 1].isPuyo !== true || stage[y][x + 1].isFallingPuyo === true && 
          stage[suby][subx + 1].isPuyo !== true || stage[suby][subx + 1].isFallingPuyo === true) {
          
          puyoMoveRight();
          break;
        }
      
      case 'z':
        rotatePuyo();
        break;
    }
    drawBoard();
  }
  
