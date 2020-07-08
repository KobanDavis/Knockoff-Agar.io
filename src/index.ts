import './index.less'
import Blob from './blob'
import Vector from './vector'
import Game from './game'

const game = new Game()

const blobs: Blob[] = []

for (let i = 0; i < 50; i++) {
	const x = Math.random() * innerWidth * 2 - innerWidth
	const y = Math.random() * innerHeight * 2 - innerHeight

	blobs.push(new Blob(game.ctx, new Vector(x, y), 10))
}

blobs.forEach((blob) => game.addBlob(blob))
