// 点击开始按钮：startPage消失，游戏开始 

// 1. 游戏开始：
// 2. 右侧播放按钮改为暂停按钮
// 3. 在main中生成大猫咪（长度和运动方向），默认长度带3个心心，默认运动方向为右侧
// 4. main随机位置中生成一个小鱼干
// 5. 大猫咪每过一秒钟向当前方向移动一个单位长度
// 6. 接受键盘按键向上下左右方向移动
// 7. 大猫咪碰到了小鱼干：长度+1，小鱼干消失，随机再次生成一个小鱼干
// 8. 大猫咪碰到了墙壁游戏结束

// 点击暂停按钮，蛇停止运动，播放按钮改为暂停按钮，点击播放按钮，恢复运动，改为暂停按钮

// 游戏结束：显示游戏结束页面，分数为心心数量-3，按钮改为播放按钮



var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var kittyBoyMove;
var speed = 200;
var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score');
var endScore = document.getElementById('endScore');
var close = document.getElementById('close');



init();

function init() {

    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    //大猫咪的真爱
    this.kittyGirlW = 20;
    this.kittyGirlH = 20;
    this.kittyGirlX = 0;
    this.kittyGirlY = 0;

    //大猫咪
    this.kittyBoyW = 20;
    this.kittyBoyH = 20;
    //数据结构：X值，Y值，头或尾
    this.kittyBoyBody = [
        [3, 1, 'kittyBoy'],
        [2, 1, 'heart'],
        [1, 1, 'heart']
    ];

    //游戏属性
    this.direct = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    scoreBox.innerHTML = this.score;


    startGame();
}

function startGame() {
    kittyGirl();
    kittyBoy();
    kittyBoyMove = setInterval(function () {
        move();
    }, speed)
    bindEvent();
}

function kittyGirl() {
    var kittyGirl = document.createElement('div');
    kittyGirl.style.width = this.kittyGirlW + 'px';
    kittyGirl.style.height = this.kittyGirlH + 'px';
    kittyGirl.style.position = 'absolute';
    this.kittyGirlX = Math.floor(Math.random() * (this.mapW / 20));
    this.kittyGirlY = Math.floor(Math.random() * (this.mapH / 20));
    kittyGirl.style.left = this.kittyGirlX * 20 + 'px';
    kittyGirl.style.top = this.kittyGirlY * 20 + 'px';
    this.mapDiv.appendChild(kittyGirl).setAttribute('class', 'kittyGirl');
}

function kittyBoy() {

    for (var i = 0; i < this.kittyBoyBody.length; i++) {
        var kittyBoy = document.createElement('div');
        kittyBoy.style.width = this.kittyBoyW + 'px';
        kittyBoy.style.height = this.kittyBoyH + 'px';
        kittyBoy.style.position = 'absolute';
        kittyBoy.style.left = this.kittyBoyBody[i][0] * 20 + 'px';
        kittyBoy.style.top = this.kittyBoyBody[i][1] * 20 + 'px';
        kittyBoy.classList.add(this.kittyBoyBody[i][2]);
        this.mapDiv.appendChild(kittyBoy).classList.add('kittyBoy');
        switch (this.direct) {
            case 'right':
                kittyBoy.style.transform = 'scale(-1,1)';
                break;
            default:
                break;
        }
    }

}

function move() {
    for (var i = this.kittyBoyBody.length - 1; i > 0; i--) {
        this.kittyBoyBody[i][0] = this.kittyBoyBody[i - 1][0];
        this.kittyBoyBody[i][1] = this.kittyBoyBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.kittyBoyBody[0][0] += 1;
            break;
        case 'left':
            this.kittyBoyBody[0][0] -= 1;
            break;
        case 'up':
            this.kittyBoyBody[0][1] -= 1;
            break;
        case 'down':
            this.kittyBoyBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('kittyBoy');
    kittyBoy();
    var kittyHX = this.kittyBoyBody[0][0];
    var kittyHY = this.kittyBoyBody[0][1];
    if (kittyHX == this.kittyGirlX && kittyHY == this.kittyGirlY) {
        var heartEndX = this.kittyBoyBody[this.kittyBoyBody.length - 1][0];
        var heartEndY = this.kittyBoyBody[this.kittyBoyBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.kittyBoyBody.push([heartEndX + 1, heartEndY, 'heart']);
                break;
            case 'left':
                this.kittyBoyBody.push([heartEndX - 1, heartEndY, 'heart']);
                break;
            case 'up':
                this.kittyBoyBody.push([heartEndX, heartEndY + 1, 'heart']);
                break;
            case 'down':
                this.kittyBoyBody.push([heartEndX, heartEndY - 1, 'heart']);
                break;
            default:
                break;
        }


        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('kittyGirl');
        kittyGirl();

    }
    if (kittyHX < 0 || kittyHX > mapW / 20) {
        relodGame();
    }
    if (kittyHY < 0 || kittyHY > mapH / 20) {
        relodGame();
    }

    for (var i = 1; i < this.kittyBoyBody.length; i++) {
        if (kittyHX == kittyBoyBody[i][0] && kittyHY == kittyBoyBody[i][1]) {
            relodGame();
        }
    }

}

function relodGame() {
    removeClass('kittyBoy');
    removeClass('kittyGril');
    clearInterval(kittyBoyMove);
    this.kittyBoyBody = [
        [3, 1, 'kittyBoy'],
        [2, 1, 'heart'],
        [1, 1, 'heart']
    ];
    //游戏属性
    this.direct = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    
    
    lose.style.display = 'block';
    endScore.innerHTML = this.score; 
    this.score = 0;
    scoreBox.innerHTML = this.score;


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
        default:
            break;
    }
}

function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDerict(code);
    }
    close.onclick = function(){
        lose.style.display = 'none';
    }
}