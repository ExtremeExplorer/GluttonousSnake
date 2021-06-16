// 定义记分牌类
class ScorePanel {
  private _score: number = 0
  private _level: number = 1
  private _scoreEle: HTMLElement
  private _levelEle: HTMLElement
  // 设置限时等级
  private readonly _maxLevel: number
  // 设置升级分数
  private readonly _upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this._scoreEle = document.getElementById("score")!
    this._levelEle = document.getElementById("level")!
    this._maxLevel = maxLevel
    this._upScore = upScore
  }

  // @ts-ignore
  // 获取level
  get level() {
    return this._level
  }

  // 设置加分
  addScore() {
    this._scoreEle.innerHTML = ++this._score + ""
    // 设置升级规则
    this._score % this._upScore === 0 && this.LevelUp()
  }

  // 设置提升等级
  LevelUp() {
    this._level < this._maxLevel && (this._levelEle.innerHTML = ++this._level + "")
  }

  // 重置记分牌
  resetScore() {
    this._score = 0
    this._level = 1
    this._scoreEle.innerHTML = this._score + ""
    this._levelEle.innerHTML = this._level + ""
  }
}

export default ScorePanel;