export const loadTexture = async url => new Promise(resolve => gameData.textureLoader.load(url, resolve))
