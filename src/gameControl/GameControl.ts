import Interface from '../interface/Interface'
import Snake from '../snake/Snake'
import Food from '../food/Food'
import ScorePanel from '../scorePanel/ScorePanel'

// 游戏控制类
class GameControl {
  // 界面
  private _interface: Interface
  // 蛇
  private _snake: Snake
  // 食物
  private _food: Food
  // 记分牌
  private _scorePanel: ScorePanel
  // 存储按键的方向
  private _direction: string = 'ArrowDown'
  // 记录游戏是否结束
  private isLive: boolean = true
  // 记录键盘的方向
  private keydown: string[] = ['a', 'Left', 'ArrowLeft', 's', 'Down', 'ArrowDown', 'd', 'Right', 'ArrowRight', 'w', 'Up', 'ArrowUp']

  constructor() {
    this._interface = new Interface()
    this._snake = new Snake()
    this._food = new Food()
    this._scorePanel = new ScorePanel()
    this.init()
  }


  //初始化游戏
  init() {
    // 绑定开始按钮事件
    this._interface.btn.addEventListener("click", this.clickEvent.bind(this))
  }

  // 点击按钮事件
  clickEvent() {
    // 关闭开始界面
    this._interface.entranceNone()
    // 蛇头出现的位置
    this._snake.appearHead()
    // 重置记分牌
    this._scorePanel.resetScore()
    // 删除蛇的身体
    this._snake.removeBody()
    // 设置按键的方向
    this._direction = 'ArrowDown'
    // 设置游戏开始
    this.isLive = true
    // 更新食物出现的位置
    this._food.change()
    // 开始时，出现1秒的延迟
    setTimeout(() => {
      // 绑定键盘事件
      document.addEventListener("keydown", this.keydownHandler.bind(this))
      // 调用snakeMove方法
      this.snakeMove()
    }, 1000)

  }

  // 键盘事件
  keydownHandler(event: KeyboardEvent) {
    if (this.keydown.indexOf(event.key) !== -1) {
      this._direction = event.key
    }
  }

  // 蛇移动事件
  snakeMove() {
    // 获取蛇坐标
    let x = this._snake.X
    let y = this._snake.Y

    // 根据按键修改x、y的值
    switch (this._direction) {
      // 向上
      case "ArrowUp":
      case "Up":
      case "w":
        y -= 10;
        break;
      // 向右
      case "ArrowRight":
      case "Right":
      case "d":
        x += 10;
        break;
      // 向下
      case "ArrowDown":
      case "Down":
      case "s":
        y += 10;
        break;
      // 向左
      case "ArrowLeft":
      case "Left":
      case "a":
        x -= 10;
        break;
    }
    // 检查蛇是否吃到食物
    this.checkEat(x, y)
    // 捕获异常
    try {
      this._snake.X = x
      this._snake.Y = y
    } catch (e) {
      this._interface.entranceShow()
      this.isLive = false
    }

    if (this.isLive) {
      setTimeout(this.snakeMove.bind(this), 300 - (this._scorePanel.level - 1) * 30)
    }
  }

  // 检查蛇是否吃到食物
  checkEat(x: number, y: number) {
    if (x === this._food.X && y === this._food.Y) {
      // 更新食物位置
      this._food.change()
      // 更新分数
      this._scorePanel.addScore()
      // 更新蛇的长度
      this._snake.addBody()
    }
  }
}

export default GameControl