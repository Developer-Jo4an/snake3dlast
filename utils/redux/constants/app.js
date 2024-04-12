import { setupManifest } from '../../../controllers/setups/setupManifest'
import { setupAll } from '../../../controllers/setups/setupAll'
import { initScene } from '../../../controllers/setups/initScene'

export const LOADING_MANIFEST = 'loadingManifest'
export const LOADING = 'loading'
export const LOADING_COMPLETE = 'loadingComplete'
export const INITIALIZATION = 'initialization'
export const SHOWING = 'showing'
export const PLAYING = 'playing'
export const PAUSED = 'paused'
export const RESET = 'reset'

export const appStateLogic = [
  { key: LOADING_MANIFEST, label: 'Loading Manifest', callback: setupManifest },
  { key: LOADING, label: 'Loading', callback: setupAll },
  { key: LOADING_COMPLETE, label: 'Loading Complete' },
  { key: INITIALIZATION, label: 'Initialization', callback: initScene },
  { key: SHOWING, label: 'Showing' },
  { key: PLAYING, label: 'Playing' },
  { key: PAUSED, label: 'Paused' },
  { key: RESET, label: 'Reset' },
]
