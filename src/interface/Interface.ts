// 定义开始、结束界面类
class Interface {
  private _entrance: HTMLElement
  private _btn: HTMLElement
  private _start: HTMLElement
  private _over: HTMLElement

  constructor() {
    this._entrance = document.getElementById('entrance')!
    this._btn = document.getElementById('btn')!
    this._start = document.getElementById('start')!
    this._over = document.getElementById('over')!
  }

  // @ts-ignore
  get btn() {
    return this._btn
  }

  // @ts-ignore
  set btn(value: HTMLElement) {
    this._btn = value
  }

  // 显示结束界面
  entranceShow() {
    this._entrance.style.display = 'flex'
    this._btn.innerHTML = "again"
    this._entrance.style.opacity = "0.9"
    this._start.style.display = "none"
    this._over.style.display = 'flex'
  }

  // 隐藏开始界面
  entranceNone() {
    this._entrance.style.display = 'none'
  }


}

export default Interface