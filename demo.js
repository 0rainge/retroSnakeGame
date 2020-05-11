// 点击开始按钮：startPage消失，游戏开始 

// 1. 游戏开始：
// 2. 右侧播放按钮改为暂停按钮
// 3. 在main中生成吃屎怪（长度和运动方向），默认长度带3个大便，默认运动方向为右侧
// 4. main随机位置中生成一个新鲜大便
// 5. 吃屎怪每过一秒钟向当前方向移动一个单位长度
// 6. 接受键盘按键向上下左右方向移动
// 7. 吃屎怪碰到了新鲜大便：长度+1，新鲜大便消失，随机再次生成一个新鲜大便
// 8. 吃屎怪碰到了墙壁游戏结束
// 点击暂停按钮，吃屎怪停止运动，播放按钮改为暂停按钮，点击播放按钮，恢复运动，改为暂停按钮
// 游戏结束：显示游戏结束页面，分数为大便数量-3，按钮改为播放按钮

var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
// var startP = document.getElementById('startPage');
var exBFMove;
var speed = 200;
var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score');
var endScore = document.getElementById('endScore');
var close = document.getElementById('close');
var startP = document.getElementById('startP');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var startPaushBool = true;
var home = document.getElementById('home');
var scoreTxt=['a','aa','fada','af','afa','ads','aaaa','adafas','fa','fa','af','aaad','ffsa','aasf','aasqg','qfea',]

init();
bindEvent();

function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //吃屎怪的真爱
    this.newShitW = 20;
    this.newShitH = 20;
    this.newShitX = 0;
    this.newShitY = 0;
    //吃屎怪
    this.exBFW = 20;
    this.exBFH = 20;
    //数据结构：X值，Y值，头或尾
    this.exBFBody = [
        [3, 1, 'exBF'],
        [2, 1, 'shit'],
        [1, 1, 'shit']
    ];
    //游戏属性
    this.direct = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    // startGame();
    // bindEvent();
}

function startGame() {
    startPage.style.display = 'none';
    startP.style.display = 'block';
    content.style.display = 'block';
    newShit();
    exBF();
    bindEvent();
}

function newShit() {
    var newShit = document.createElement('div');
    newShit.style.width = this.newShitW + 'px';
    newShit.style.height = this.newShitH + 'px';
    newShit.style.position = 'absolute';
    this.newShitX = Math.floor(Math.random() * (this.mapW / 20));
    this.newShitY = Math.floor(Math.random() * (this.mapH / 20));
    newShit.style.left = this.newShitX * 20 + 'px';
    newShit.style.top = this.newShitY * 20 + 'px';
    this.mapDiv.appendChild(newShit).setAttribute('class', 'newShit');
}

function exBF() {
    for (var i = 0; i < this.exBFBody.length; i++) {
        var exBF = document.createElement('div');
        exBF.style.width = this.exBFW + 'px';
        exBF.style.height = this.exBFH + 'px';
        exBF.style.position = 'absolute';
        exBF.style.left = this.exBFBody[i][0] * 20 + 'px';
        exBF.style.top = this.exBFBody[i][1] * 20 + 'px';
        exBF.classList.add(this.exBFBody[i][2]);
        this.mapDiv.appendChild(exBF).classList.add('exBF');
        switch (this.direct) {
            case 'right':
                exBF.style.transform = 'scale(-1,1)';
                break;
            default:
                break;
        }
    }
}

function move() {
    for (var i = this.exBFBody.length - 1; i > 0; i--) {
        this.exBFBody[i][0] = this.exBFBody[i - 1][0];
        this.exBFBody[i][1] = this.exBFBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.exBFBody[0][0] += 1;
            break;
        case 'left':
            this.exBFBody[0][0] -= 1;
            break;
        case 'up':
            this.exBFBody[0][1] -= 1;
            break;
        case 'down':
            this.exBFBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('exBF');
    exBF();
    var kittyHX = this.exBFBody[0][0];
    var kittyHY = this.exBFBody[0][1];
    if (kittyHX == this.newShitX && kittyHY == this.newShitY) {
        var shitEndX = this.exBFBody[this.exBFBody.length - 1][0];
        var shitEndY = this.exBFBody[this.exBFBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.exBFBody.push([shitEndX + 1, shitEndY, 'shit']);
                break;
            case 'left':
                this.exBFBody.push([shitEndX - 1, shitEndY, 'shit']);
                break;
            case 'up':
                this.exBFBody.push([shitEndX, shitEndY + 1, 'shit']);
                break;
            case 'down':
                this.exBFBody.push([shitEndX, shitEndY - 1, 'shit']);
                break;
            default:
                break;
        }

        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('newShit');
        newShit();
    }
    if (kittyHX < 0 || kittyHX > mapW / 20) {
        console.log(mapW / 20);
        relodGame();
    }
    if (kittyHY < 0 || kittyHY > mapH / 20) {
        console.log(mapW / 20);
        relodGame();
    }

    // if (kittyHX < 0 || kittyHX > mapW) {
    //     // console.log(mapW / 20);
    //     relodGame();
    // }
    // if (kittyHY < 0 || kittyHY > mapH) {
    //     // console.log(mapW / 20);
    //     relodGame();
    // }

    for (var i = 1; i < this.exBFBody.length; i++) {
        if (kittyHX == exBFBody[i][0] && kittyHY == exBFBody[i][1]) {
            relodGame();
        }
    }

}

function relodGame() {
    content.style.display = 'none';
    removeClass('exBF');
    removeClass('newShit');
    clearInterval(exBFMove);
    this.exBFBody = [
        [3, 1, 'exBF'],
        [2, 1, 'shit'],
        [1, 1, 'shit']
    ];
    //游戏属性
    this.direct = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    lose.style.display = 'block';
    endScore.innerHTML = '前男友吃下的大便个数：' + this.score;
    scoreReview(this.score);
    scoreBox.innerHTML = this.score;
    this.score = 0;
    startP.setAttribute('src', './img/start2.png');
    startGameBool = true;
    startPaushBool = true;
}

function scoreReview(score) {
    endScore.innerHTML = `哇！前男友吃下了${score}个大便！`;
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentElement.removeChild(ele[0]);
    }
}

function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left == true) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up == true) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right == true) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down == true) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 32:
            startAndPaush();
            break;
        default:
            break;
    }
}

function startAndPaush() {
    if (startPaushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src', './img/pause2.png');
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
        }
        exBFMove = setInterval(function () {
            move();
        }, speed);
        startPaushBool = false;
    } else {
        startP.setAttribute('src', './img/start2.png');
        clearInterval(exBFMove);
        startPaushBool = true;
        document.onkeydown = function (e) {
            if(e.keyCode == 32){
                this.startPaushBool = true;
                startAndPaush();
            }
            e.returnValue = false;
            return false;
        }
        
    }
}

function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDerict(code);
    }
    close.onclick = function () {
        lose.style.display = 'none';
        this.score = 0;
        scoreBox.innerHTML = this.score;
    }
    startBtn.onclick = function () {
        startAndPaush();
    }
    startP.onclick = function () {
        startAndPaush();
    }

}
