import { BODY_CHUNK_AMOUNT } from '../constants/bodyContstants'
import { Body } from './Body'
import { Controls } from './Controls'
import { Head } from './Head'

export class Snake {

  head = new Head()

  bodyChunks = new Array(BODY_CHUNK_AMOUNT).fill().map((_, x) => new Body(x + 1))

  controls

  activate() {
    this.controls = new Controls(this.head, this.bodyChunks)
    this.controls.listenEvents()
  }

  deactivate() {
    this.controls.unlistenEvents()
  }
}
