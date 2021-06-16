// 定义蛇类
class Snake {
  // 获取蛇的容器
  private _element: HTMLElement
  // 获取蛇头的元素
  private _head: HTMLElement
  // 蛇的身体(包括蛇头)
  private _bodies: HTMLCollection

  constructor() {
    this._element = document.getElementById("snake")!
    this._head = document.querySelector('#snake>div')!
    this._bodies = this._element.getElementsByTagName('div')
  }

  // 获取蛇(蛇头)的坐标
  // @ts-ignore
  get X() {
    return this._head.offsetLeft
  }

  // @ts-ignore
  get Y() {
    return this._head.offsetTop
  }

  // 设置蛇(蛇头)的坐标
  // @ts-ignore
  set X(value: number) {
    if (this.X === value) return
    // 判断蛇是否触墙
    if (value < 0 || value > 290) {
      // 抛出异常
      throw new Error("GAME OVER")
    }
    // 禁止蛇掉头
    if (this._bodies[1] && (this._bodies[1] as HTMLElement).offsetLeft === value) {
      value > this.X ? value = this.X - 10 : value = this.X + 10
    }
    // 移动身体
    this.moveBody()
    // 修改X坐标
    this._head.style.left = value + "px"
    // 检查蛇头和身体是否发生碰撞
    this.checkHeadBody()
  }

  // @ts-ignore
  set Y(value: number) {
    if (this.Y === value) return
    // 判断蛇是否触墙
    if (value < 0 || value > 290) {
      // 抛出异常
      throw new Error("GAME OVER")
    }
    // 禁止蛇掉头
    if (this._bodies[1] && (this._bodies[1] as HTMLElement).offsetTop === value) {
      value > this.Y ? value = this.Y - 10 : value = this.Y + 10
    }
    // 移动身体
    this.moveBody()
    // 修改Y坐标
    this._head.style.top = value + "px"
    // 检查蛇头和身体是否发生碰撞
    this.checkHeadBody()
  }

  // 增加蛇的身体
  addBody() {
    this._element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 删除蛇的身体
  removeBody() {
    for (let i = this._bodies.length - 1; i > 0; i--) {
      this._bodies[i].remove()
    }
  }

  // 蛇身体移动
  moveBody() {
    // 从后往前改
    for (let i = this._bodies.length - 1; i > 0; i--) {
      let x = (this._bodies[i - 1] as HTMLElement).offsetLeft
      let y = (this._bodies[i - 1] as HTMLElement).offsetTop;
      (this._bodies[i] as HTMLElement).style.left = x + 'px';
      (this._bodies[i] as HTMLElement).style.top = y + 'px';
    }
  }

  // 检查蛇头和身体是否发生碰撞
  checkHeadBody() {
    for (let i = 1; i < this._bodies.length; i++) {
      let bd = this._bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y == bd.offsetTop) {
        // 抛出异常
        throw new Error("GAME OVER")
      }
    }
  }

// 蛇头出现的位置
  appearHead() {
    let left = Math.round(Math.random() * 29) * 10
    this._head.style.left = left + 'px'
    this._head.style.top = '0px'
  }
}


export default Snake