import {
  CAMERA_DEFAULT_ASPECT,
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR, CAMERA_X_DISTANCE, CAMERA_X_START_DISTANCE, CAMERA_Y_DISTANCE, CAMERA_Y_START_DISTANCE
} from '../constants/cameraConstants'
import {
  BACK_FOR_FOG,
  FOG_COLOR,
  FOG_FAR,
  FOG_NEAR
} from '../constants/fogConstants'
import { Floor } from '../floor/Floor'
import { Snake } from '../snake/Snake'
import { gsap } from 'gsap'

export class SceneInit {
  PLAYING_MODE = 'playing'

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    CAMERA_DEFAULT_ASPECT,
    CAMERA_NEAR,
    CAMERA_FAR
  )

  renderer = new THREE.WebGLRenderer()

  snake

  generalAnimationFrame

  showingAnimationFrame

  showingTimeline

  constructor(container) {
    this.resize = this.resize.bind(this)
    this.generalAnimation = this.generalAnimation.bind(this)
    this.showingAnimation = this.showingAnimation.bind(this)

    this.$container = container
  }

  addSnake() {
    this.snake = new Snake()
    this.scene.add(this.snake.head)
    this.snake.bodyChunks.forEach(chunk => this.scene.add(chunk))
  }

  createFog() {
    this.scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR)
    this.scene.background = new THREE.Color(BACK_FOR_FOG)
  }

  createFloor() {
    this.scene.add(new Floor())
  }

  paused() {
    this.snake.deactivate()
    cancelAnimationFrame(this.generalAnimationFrame)
  }

  playing() {
    this.snake.activate()
    this.generalAnimationFrame = requestAnimationFrame(this.generalAnimation)
  }

  lookToTarget() {
    this.camera.updateWorldMatrix()
    this.camera.lookAt(this.snake.head.position)
    this.renderer.render(this.scene, this.camera)
  }

  toPlayingMode() {
    const playingEvent = new CustomEvent(this.PLAYING_MODE)
    window.dispatchEvent(playingEvent)
  }

  showingAnimation() {
    let endOfAnimation = false

    this.showingTimeline.to(this.camera.position, {
      duration: 2,
      x: this.snake.head.position.x + CAMERA_X_DISTANCE,
      y: this.snake.head.position.y + CAMERA_Y_DISTANCE,
      z: this.snake.head.position.z,
      ease: 'sine.inOut',
      onComplete: () => {
        this.toPlayingMode()
        cancelAnimationFrame(this.showingAnimationFrame)
        this.showingTimeline.kill()
        endOfAnimation = true
      }
    })

    if (endOfAnimation) return

    this.lookToTarget()
    this.renderer.render(this.scene, this.camera)
    this.showingAnimationFrame = requestAnimationFrame(this.showingAnimation)
  }

  showing() {
    this.updateCamera(CAMERA_X_START_DISTANCE, CAMERA_Y_START_DISTANCE)
    this.renderer.render(this.scene, this.camera)
    this.showingTimeline = gsap.timeline()
    this.showingAnimationFrame = requestAnimationFrame(this.showingAnimation)
  }

  updateCamera(x, y) {
    this.camera.position.set(
      this.snake.head.position.x + x,
      this.snake.head.position.y + y,
      this.snake.head.position.z
    )
    this.lookToTarget()
  }

  generalAnimation() {
    this.updateCamera(CAMERA_X_DISTANCE, CAMERA_Y_DISTANCE)

    this.renderer.render(this.scene, this.camera)
    this.generalAnimationFrame = requestAnimationFrame(this.generalAnimation)
  }

  resize() {
    const width = +this.$container.offsetWidth
    const height = +this.$container.offsetHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }

  initialization() {
    this.$container.append(this.renderer.domElement)

    this.createFog()
    this.createFloor()
    this.addSnake()
    this.resize()

    window.addEventListener('resize', this.resize)
  }

  reset() {
    cancelAnimationFrame(this.generalAnimationFrame)

    this.renderer.domElement.remove()

    while (this.scene.children[0])
      this.scene.remove(this.scene.children[0])

    this.scene.fog = null
    this.scene.background = null

    this.snake.deactivate()
    this.snake = null

    window.removeEventListener('resize', this.resize)
  }
}
