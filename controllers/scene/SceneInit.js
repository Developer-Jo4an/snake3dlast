import {
  CAMERA_DEFAULT_ASPECT,
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_X_DISTANCE, CAMERA_X_START_DISTANCE, CAMERA_Y_DISTANCE, CAMERA_Y_START_DISTANCE
} from '../constants/cameraConstants'
import {
  BACK_FOR_FOG,
  FOG_COLOR,
  FOG_FAR,
  FOG_NEAR
} from '../constants/fogConstants'
import { Snake } from '../snake/Snake'
import { Floor } from '../floor/Floor'

export class SceneInit {

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    CAMERA_DEFAULT_ASPECT,
    CAMERA_NEAR,
    CAMERA_FAR
  )

  renderer = new THREE.WebGLRenderer()

  snake = new Snake()

  generalAnimationFrame
  showingAnimationFrame

  constructor(container) {
    this.resize = this.resize.bind(this)
    this.generalAnimation = this.generalAnimation.bind(this)
    this.showing = this.showing.bind(this)

    this.$container = container
  }

  addSnake() {
    this.scene.add(this.snake.head)
    this.snake.bodyChunks.forEach(chunk => this.scene.add(chunk))
    this.snake.activate()
  }

  createFog() {
    this.scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR)
    this.scene.background = new THREE.Color(BACK_FOR_FOG)
  }

  createFloor() {
    this.scene.add(new Floor())
  }

  showingAnimation() {

  }

  showing() {
    // if (
    //   this.camera.position.x <= this.snake.head.position.x + CAMERA_X_DISTANCE
    //   &&
    //   this.camera.position.y <= this.snake.head.position.y + CAMERA_Y_DISTANCE
    // ) {
    //   cancelAnimationFrame(this.showingAnimationFrame)
    //   return
    // }

    this.updateCamera(-0.01, -0.01)
    this.showingAnimationFrame = requestAnimationFrame(this.showing)
    this.renderer.render(this.scene, this.camera)
  }

  updateCamera(x, y) {
    this.camera.position.x = this.snake.head.position.x + x
    this.camera.position.y = this.snake.head.position.y + y

    this.camera.updateWorldMatrix()
    this.camera.lookAt(this.snake.head.position)
  }

  generalAnimation() {
    this.updateCamera(CAMERA_X_DISTANCE, CAMERA_Y_DISTANCE)

    this.renderer.render(this.scene, this.camera)
    this.generalAnimationFrame = requestAnimationFrame(this.generalAnimation)
  }

  mounting() {
    this.$container.append(this.renderer.domElement)

    this.createFog()
    this.createFloor()
    this.addSnake()

    this.resize()

    this.updateCamera(CAMERA_X_START_DISTANCE, CAMERA_Y_START_DISTANCE)
    this.renderer.render(this.scene, this.camera)
    this.showingAnimationFrame = requestAnimationFrame(this.showing)
  }

  demounting() {
    while (this.scene.children[0])
      this.scene.remove(this.scene.children[0])
    this.renderer.dispose()
    this.snake.deactivate()
    delete window.THREE
    delete window.textures
    cancelAnimationFrame(this.generalAnimationFrame)
  }

  resize() {
    const width = +this.$container.offsetWidth
    const height = +this.$container.offsetHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }

  activate() {
    this.mounting()
    window.addEventListener('resize', this.resize)
  }

  deactivate() {
    this.demounting()
    window.removeEventListener('resize', this.resize)
  }
}
