# retroSnakeGame

Play this addictive little JavaScript game

JS/两只猫咪的爱情故事/贪吃大猫咪/贪吃蛇

## 0.界面展示

- #### 游戏开始界面
![image](https://github.com/0rainge/retroSnakeGame/blob/master/img/docImg/demo1.jpeg?raw=true)
- #### 游戏界面
![image](https://github.com/0rainge/retroSnakeGame/blob/master/img/docImg/demo2.jpeg?raw=true)
- #### 游戏结束界面
![image](https://github.com/0rainge/retroSnakeGame/blob/master/img/docImg/demo3.jpeg?raw=true)

## 1. HTML：DOM结构

```
开始页面——开始按钮


外部页面——左侧——播放图标
           |
             ——主页面——头——分数div——“分数”
	        |	      |	     |
                |             |       ———分数数字span
	        |	      |
                |              ——内容区域
                |
                 ——失败页面——失败图标——失败分数
                               |
                                ————关闭标签
                              
```

（写一个分析dom树的小工具）

## 2. 分析游戏思路

- 点击开始按钮：startPage消失，游戏开始 

1. 游戏开始：
2. 右侧播放按钮改为暂停按钮
3. 在main中生成大猫咪（长度和运动方向），默认长度为带两个心心，默认运动方向为右侧
4. main随机生成大猫咪的真爱的位置
5. 大猫咪每过一秒钟向当前方向移动一个单位长度
6. 接受键盘按键向上下左右方向移动
7. 大猫咪碰到了真爱：小心心+1，随机再次生成真爱位置
8. 大猫咪碰到了墙壁游戏结束
9. 点击暂停按钮，蛇停止运动，播放按钮改为暂停按钮，点击播放按钮，恢复运动，改为暂停按钮

- 游戏结束：显示游戏结束页面，分数为大猫咪的心心，按钮改为播放按钮

## 3. 实现问题记录

- #### 游戏初始化

init() 初始化参数
content所有区域都用坐标属性来表示，一个单位长度是一个心心的长度，用坐标乘自身20的宽就是

- #### 如何随机生成大猫咪真爱位置：

1. 找到能够容纳的最多单位数：mapW/foodW = 最大宽度

2. 找到随机单位：通过随机数在0-最多食物数之间挑一个，即0-1之间的随机数*最大宽度 =[0，最大单位数] = 随机单位数（记得取整）

3. 找到随机位置：随机位置 = 随机单位*单位长度 = 随机单位（整数）*20

- #### 如何生成大猫咪：

1. 数据结构：用二维数组数组代表整个大猫咪：包括坐标和结构
2. 设置每个小块div的大小和定位，添加类名

- #### 移动大猫咪：

1. 直线移动：移动到上一个节点的位置
2. 改变方向：x和y + 和 - 
3. 刷新移动：删掉旧的位置的大猫咪，渲染新的位置的大猫咪
4. 只能左右90度转弯：判断位置能否改变：加锁，用布尔变量判断能否改变？
5. 改变方向：监听键盘落下的事件
6. 一直运动：添加定时器，速度
7. 改变大猫咪的图片方向

-  #### 增加亲密度（分数）：

1. 条件：位置一样
2. 分数增加，改变html

-  #### 增加尾巴心心：

1. 确定新增位置坐标
2. 向其中心心队列push新的心心

-  #### 遇到边距/碰到自己：

1. 确定大猫咪的定位
2. 分别和0，最大值，自身的位置比较：判断是否结束游戏

-  #### 游戏结束：

1. 数据回归原始值
2. 显示窗口
3. 关闭游戏结束窗口

-  #### 设置游戏控制逻辑：

1. 点击：开始按钮——开始新游戏，播放按钮——开始新游戏或继续当前游戏，暂停按钮——暂停游戏
2. 判断游戏状态：startPaushBool——暂停/开始，startGameBool——新游戏/当前游戏
3. 新游戏：开始游戏，改变状态startGameBool，改变状态startPaushBool，开始移动，监听键盘事件，改变图标。
4. 继续游戏：改变状态startPaushBool，开始移动，监听键盘事件，改变图标。
5. 暂停游戏：改变图标，停止键盘监听，停止移动，改变startPaushBool状态
