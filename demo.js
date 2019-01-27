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

var content = document.getElementById('content')

init(); 

function init(){
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
}