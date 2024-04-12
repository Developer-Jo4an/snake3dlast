import { ACTIONS, AVAILABLE_KEYS, MOVE_SPEED, ROTATE_SPEED } from '../constants/moveConstants'
import { BODY_CHUNK_HEIGHT } from '../constants/bodyContstants'

export class Controls {

  actions = ACTIONS

  availableKeys = AVAILABLE_KEYS

  activeKeys = []

  activeActions = []

  snakeAnimationId

  constructor(head, bodyChunks) {
    this.activateAction = this.activateAction.bind(this)
    this.deactivateAction = this.deactivateAction.bind(this)
    this.snakeAnimation = this.snakeAnimation.bind(this)

    this.snakeHead = head
    this.snakeBodyChunks = bodyChunks
  }

  forwardAction() {
    this.snakeHead.translateX(-MOVE_SPEED)

    const snakeParts = [this.snakeHead, ...this.snakeBodyChunks]

    snakeParts.forEach((curChunk, i, arr) => {
      if (!i) return

      const previousChunk = arr[i - 1]

      curChunk.lookAt(previousChunk.position)

      const distance = curChunk.position.distanceTo(previousChunk.position)
      const diff = distance - BODY_CHUNK_HEIGHT

      if (diff > 0) curChunk.translateZ(diff)
    })
  }

  leftAction() {
    this.snakeHead.rotation.y += ROTATE_SPEED
  }

  rightAction() {
    this.snakeHead.rotation.y -= ROTATE_SPEED
  }

  snakeAnimation() {
    this.activeActions.forEach(action => this[`${ action }Action`]?.())
    this.snakeAnimationId = requestAnimationFrame(this.snakeAnimation)
  }

  getCurrentAction(keyCode) {
    return Object.entries(this.actions)
    .reduce((acc, [_, actionObj]) =>
        actionObj.keys.includes(keyCode) ?
          actionObj
          :
          acc
      , null)
  }

  activateAction({ keyCode }) {
    if (!this.availableKeys.includes(keyCode)) return

    this.activeKeys.push(keyCode)

    const currentAction = this.getCurrentAction(keyCode)

    if (currentAction.isActive) return

    currentAction.isActive = true
    this.activeActions.push(currentAction.name)
  }

  deactivateAction({ keyCode }) {
    if (!this.availableKeys.includes(keyCode)) return

    this.activeKeys = this.activeKeys.filter(key => key !== keyCode)

    const currentAction = this.getCurrentAction(keyCode)

    const isWillActive = currentAction.keys.reduce((acc, key) =>
        this.activeKeys.includes(key) ? true : acc
      , false)

    if (isWillActive) return

    currentAction.isActive = false
    this.activeActions = this.activeActions.filter(action => action !== currentAction.name)
  }

  stopActions() {
    this.activeKeys = []
    this.activeActions = []
    for (const name in this.actions) {
      const obj = this.actions[name]
      obj.isActive = false
    }
  }

  listenEvents() {
    this.snakeAnimationId = requestAnimationFrame(this.snakeAnimation)
    window.addEventListener('keydown', this.activateAction)
    window.addEventListener('keyup', this.deactivateAction)
  }

  unlistenEvents() {
    this.stopActions()
    if (this.snakeAnimationId)
      cancelAnimationFrame(this.snakeAnimationId)
    window.removeEventListener('keydown', this.activateAction)
    window.removeEventListener('keyup', this.deactivateAction)
  }
}
