// 定义食物类
class Food {
  // 定义一个属性表示食物所对应的元素
  private _element: HTMLElement

  constructor() {
    // 获取页面中的food元素
    this._element = document.getElementById("food")!
  }

  // 获取食物X轴的坐标
  // @ts-ignore
  get X(): number {
    // ?. 可选链操作符,在引用为空的情况下不会引起错误
    return this._element?.offsetLeft
  }

  // 获取食物Y轴的坐标
  // @ts-ignore
  get Y(): number {
    return this._element.offsetTop
  }

  // 更改食物的位置
  change() {
    /*
    * 食物的位置0~290
    * 蛇移动一格为10
    * */
    let x = Math.round(Math.random() * 29) * 10
    let y = Math.round(Math.random() * 29) * 10
    this._element.style.left = x + 'px';
    this._element.style.top = y + 'px';

  }
}

export default Food;