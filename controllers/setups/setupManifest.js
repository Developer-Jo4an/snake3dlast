import { ASSETS } from '../constants/assetsConstants'

export const setupManifest = async () => {
  const manifest = await import('/manifest.json')
  manifest.assets.forEach(asset => ASSETS.push(asset))
}

