export const LOADING_MANIFEST = 'loadingManifest'
export const LOADING = 'loading'
export const LOADING_COMPLETE = 'loadingComplete'
export const INITIALIZATION = 'initialization'
export const SHOWING = 'showing'
export const PLAYING = 'playing'
export const PAUSED = 'paused'
export const RESET = 'reset'

export const stateChange = {
  [LOADING_MANIFEST]: LOADING,
  [LOADING]: LOADING_COMPLETE,
  [LOADING_COMPLETE]: INITIALIZATION,
  [INITIALIZATION]: SHOWING,
  [SHOWING]: PLAYING
}
